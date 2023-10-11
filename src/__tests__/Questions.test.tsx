import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Questions from '@/pages/Questions';
import Result from '@/pages/Result';
import { renderWithWrappers } from '@/__helpers__/wrapper';
import { commentsPattern, getMockImplementation } from '@/__helpers__/axiosGetMock';

const mockedGet = axios.get as jest.MockedFunction<typeof axios.get>;
const mockedPost = axios.post as jest.MockedFunction<typeof axios.post>;
const mockedDelete = axios.delete as jest.MockedFunction<typeof axios.delete>;

describe('Questions page', () => {
  beforeAll(() => {
    window.HTMLDialogElement.prototype.close = jest.fn();
    window.HTMLDialogElement.prototype.show = function () {
      this.setAttribute('open', 'true');
    };
    window.scrollTo = jest.fn();
  });

  beforeEach(() => {
    mockedGet.mockImplementation(getMockImplementation);
    mockedPost.mockImplementation(() => Promise.resolve());
    mockedDelete.mockImplementation(() => Promise.resolve());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Question', () => {
    test('increases progress bar and number when the Next button is clicked', async () => {
      renderWithWrappers(<Questions />);
      const user = userEvent.setup();

      const initialProgressBar = screen.getByRole('progressbar');
      expect(initialProgressBar).toHaveAttribute('aria-valuenow', '1');

      const initialCount = screen.getByText('1/15');
      expect(initialCount).toBeInTheDocument();

      const optionButton = await screen.findByRole('button', { name: /option a/ });
      await user.click(optionButton);

      const nextButton = screen.getByRole('button', { name: '다음으로' });
      await user.click(nextButton);

      const increasedProgressBar = screen.getByRole('progressbar');
      expect(increasedProgressBar).toHaveAttribute('aria-valuenow', '2');

      const increasedCount = screen.getByText('2/15');
      expect(increasedCount).toBeInTheDocument();
    });

    test('navigates to the Result page when progress reaches 100%', async () => {
      renderWithWrappers(
        <Routes>
          <Route path="questions/self" element={<Questions />} />
          <Route path="questions/result" element={<Result />} />
        </Routes>,
        ['/questions/self'],
      );
      const user = userEvent.setup();

      const initialProgressBar = screen.getByRole('progressbar');
      expect(initialProgressBar).toHaveAttribute('aria-valuenow', '1');

      const initialCount = screen.getByText('1/15');
      expect(initialCount).toBeInTheDocument();

      for (let i = 0; i < 15; i++) {
        const optionButton = await screen.findByRole('button', { name: /option a/ });
        await user.click(optionButton);

        const nextButton = screen.getByRole('button', { name: '다음으로' });
        await user.click(nextButton);
      }

      const resultTitle = screen.getByRole('heading', {
        level: 1,
        name: '골라바 게임 완료!',
      });
      expect(resultTitle).toBeInTheDocument();
    });

    test('enables the Next button and changes the UI after a selection is made', async () => {
      renderWithWrappers(<Questions />);
      const user = userEvent.setup();

      const nextButton = screen.getByRole('button', { name: '다음으로' });
      expect(nextButton).toBeDisabled();

      const option = await screen.findByRole('button', { name: /option a/ });
      await user.click(option);

      expect(nextButton).toBeEnabled();
    });

    test('enables comment input after a selection is made', async () => {
      renderWithWrappers(<Questions />);
      const user = userEvent.setup();

      const disabledCommentInput = screen.getByPlaceholderText('답변을 선택해야 입력할 수 있어요.');
      expect(disabledCommentInput).toBeDisabled();

      const option = await screen.findByRole('button', { name: /option a/ });
      await user.click(option);

      const enabledCommentInput = screen.getByPlaceholderText('댓글을 입력할 수 있어요.');
      expect(enabledCommentInput).toBeEnabled();
    });
  });

  describe('Comment', () => {
    test('allows users to write and submit a comment', async () => {
      mockedGet.mockImplementation((url) => {
        const commentsMatch = url.match(commentsPattern);

        const callCount = mockedGet.mock.calls.filter((call) =>
          call[0].match(commentsPattern),
        ).length;

        const mockedComment = {
          id: 1,
          username: 'username',
          content: 'content',
        };

        if (commentsMatch && callCount === 2) {
          const id = Number(commentsMatch[1]);
          return Promise.resolve({
            data: {
              data: {
                questionId: id,
                comments: [mockedComment],
                page: {
                  size: 10,
                  nextId: 1,
                  last: true,
                },
              },
            },
          });
        }
        return getMockImplementation(url);
      });

      renderWithWrappers(<Questions />);
      const user = userEvent.setup();

      const commentList = await waitFor(() => screen.queryAllByRole('article'));
      expect(commentList).toHaveLength(0);

      const option = await screen.findByRole('button', { name: /option a/ });
      await user.click(option);

      const commentInput = screen.getByPlaceholderText('댓글을 입력할 수 있어요.');
      const openModalButton = screen.getByRole('button', { name: '댓글 작성 모달 열기' });

      expect(commentInput).toBeEnabled();
      await user.type(commentInput, 'test comment');

      expect(openModalButton).toBeEnabled();
      await user.type(commentInput, '{enter}');

      const postCommentModal = screen.getByRole('dialog', { name: '댓글 작성 모달' });
      const nicknameInput = postCommentModal.querySelector('#nickname_post');
      const passwordInput = postCommentModal.querySelector('#password_post');
      const postCommentButton = screen.getByRole('button', { name: '댓글달기' });

      expect(postCommentModal).toBeVisible();

      if (!nicknameInput || !passwordInput) {
        throw new Error("Can't find input elements");
      }

      await user.type(nicknameInput, 'test user');
      await user.type(passwordInput, '1234');

      expect(postCommentButton).toBeEnabled();
      await user.type(passwordInput, '{enter}');

      const updatedCommentList = await screen.findAllByRole('article');
      expect(updatedCommentList).toHaveLength(1);
    });

    test('allows users to delete a comment', async () => {
      mockedGet.mockImplementation((url) => {
        const commentsMatch = url.match(commentsPattern);

        const callCount = mockedGet.mock.calls.filter((call) =>
          call[0].match(commentsPattern),
        ).length;

        const mockedComment = {
          id: 1,
          username: 'username',
          content: 'content',
        };

        if (commentsMatch && callCount === 1) {
          const id = Number(commentsMatch[1]);
          return Promise.resolve({
            data: {
              data: {
                questionId: id,
                comments: [mockedComment],
                page: {
                  size: 10,
                  nextId: 1,
                  last: true,
                },
              },
            },
          });
        }
        return getMockImplementation(url);
      });

      renderWithWrappers(<Questions />);
      const user = userEvent.setup();

      const commentList = await screen.findAllByRole('article');
      expect(commentList).toHaveLength(1);

      const openModalButton = await screen.findByRole('button', { name: '댓글 삭제 모달 열기' });
      await user.click(openModalButton);

      const deleteCommentModal = screen.getByRole('dialog', { name: '댓글 삭제 모달' });
      const passwordInput = deleteCommentModal.querySelector('#password_delete');
      const deleteCommentButton = screen.getByRole('button', { name: '삭제하기' });

      expect(deleteCommentModal).toBeVisible();

      if (!passwordInput) {
        throw new Error("Can't find password input element!");
      }

      await user.type(passwordInput, '1234');

      expect(deleteCommentButton).toBeEnabled();
      await user.type(passwordInput, '{enter}');

      const updatedCommentList = await waitFor(() => screen.queryAllByRole('article'));
      expect(updatedCommentList).toHaveLength(0);
    });
  });
});

const idsPattern = /\/api\/golrabas\/category\/([A-z]+)$/;
const questionPattern = /\/api\/golrabas\/(\d+)$/;
export const commentsPattern = /\/api\/golrabas\/(\d+)\/comments$/;

export const getMockImplementation = (url: string) => {
  const idsMatch = url.match(idsPattern);
  const questionMatch = url.match(questionPattern);
  const commentsMatch = url.match(commentsPattern);

  const mockedQuestionIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const mockedQuestion = {
    id: 1,
    choiceA: 'option a',
    choiceB: 'option b',
    choiceAResult: 50,
    choiceBResult: 50,
  };

  if (idsMatch) {
    return Promise.resolve({
      data: {
        data: { questionIds: mockedQuestionIds },
      },
    });
  }

  if (questionMatch) {
    return Promise.resolve({
      data: {
        data: mockedQuestion,
      },
    });
  }

  if (commentsMatch) {
    const id = Number(commentsMatch[1]);
    return Promise.resolve({
      data: {
        data: {
          questionId: id,
          comments: [],
          page: {
            size: 10,
            nextId: 0,
            last: true,
          },
        },
      },
    });
  }
  return Promise.resolve();
};

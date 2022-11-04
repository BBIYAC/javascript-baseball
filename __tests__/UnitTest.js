const App = require("../src/App");
const MissionUtils = require("@woowacourse/mission-utils");

expect.extend({
  toBeDistinct(received) {
    const pass = received && new Set(received).size === received.length;
    if (pass) {
      return {
        message: () => `expected ${received} string is unique`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} string is not to unique`,
        pass: false,
      };
    }
  },
});

expect.extend({
  toBeThreeNumber(received) {
    const pass = received.length === 3 && !/[^1-9]/g.test(received);
    if (pass) {
      return {
        message: () => `expected ${received} string is three number`,
        pass: true,
    };
    } else {
      return {
        message: () => `expected ${received} string is not to three number`,
        pass: false,
    };
    }
  }
});

const mockQuestions = (answers) => {
  MissionUtils.Console.readLine = jest.fn();
  answers.reduce((acc, input) => {
    return acc.mockImplementationOnce((question, callback) => {
    callback(input);
    });
  }, MissionUtils.Console.readLine);
};
  
const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

describe("숫자 랜덤 생성 테스트", () => {
  test("case1", () => {
    const app = new App();
    const randoms = app.getThreeRandom()

    expect(randoms).toBeThreeNumber();
    expect(randoms).toBeDistinct();
  });
});

describe("시작 문구 출력 테스트", () => {
  test("case1", () => {
    const logSpy = getLogSpy();

    const app = new App();
    app.printStart();
      
    expect(logSpy).toHaveBeenCalled();
  });
});

describe("세 자리 숫자 입력 테스트", () => {
  test("case1", () => {
    const logSpy = getLogSpy();
    const answer = '123';
    const input = ['123'];

    mockQuestions(input);

    const app = new App();
    app.inputNumbers(answer);
    
    expect(logSpy).toHaveBeenCalled();
  });

  test("case2", () => {
    const logSpy = getLogSpy();
    const answer = '123';
    const input = ['132'];

    mockQuestions(input);

    const app = new App();
    app.inputNumbers(answer);
    
    expect(logSpy).toHaveBeenCalled();
  });

  test("case3", () => {
    const answer = '123';
    const input = ['ddd'];

    mockQuestions(input);
    
    expect(() => {
        const app = new App();
        app.inputNumbers(answer);
    }).toThrow();
  });

  test("case4", () => {
    const answer = '123';
    const input = ['012'];

    mockQuestions(input);
    
    expect(() => {
        const app = new App();
        app.inputNumbers(answer);
    }).toThrow();
  });
});
/**
 * 기존 에러 클래스를 확장한 AppError 클래스
 * 기존 에러 클래스 대비 name과 httpCode를 추가로 저장하여 express의 중앙 에러 핸들러가 에러 처리를 보다 쉽게 할 수 있도록 도와준다.
 * 참고: https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/useonlythebuiltinerror.md#code-example--doing-it-even-better
 */
class AppError extends Error {
    name: string;
    httpCode?: number; // '?'를 추가하여 선택적으로 설정
  
    constructor(name: string, description: string, httpCode?: number) {
      // '?'를 추가하여 선택적으로 설정
      super(description);
  
      this.name = name;
      if (httpCode) {
        this.httpCode = httpCode;
      }
      Error.captureStackTrace(this);
    }
  }
  
export default AppError;
  
# 1. 데이터 타입

## 1-1. 데이터 타입의 종류

- 기본형 : number, string, boolean, null, undefined, Symbol
- 참조형 : Object, Array, Function, Date, RegExp, Map, WeakMap, Set, WeakSet 등

\*\* Symbol?

- https://another-light.tistory.com/105
- typescript의 `"some string" as const` 와 비슷한 것 같다.
- Object에서 key를 숨기거나 javascript에서 enum을 만들 때 활용할 수 있다.
- 아마 javascript class의 private field(#filedName)을 구현할 때 사용했을 것 같다.
  - 찾아보니 symbol로 구현했다고 나와있진 않고 비슷한 원리로 구현했을 것 같다. 나중에 javascript에 대해 더 깊게 알아볼 때 찾아보자

#### 기본형 vs 참조형

- 기본형은 할당이나 연산시 복제되고 참조형은 참조된다
  - 참조형 - 값이 담긴 주솟값들로 이루어진 묶음을 가리키는 주솟값을 복제

## 1-2. 데이터 타입에 관한 배경지식

### 1-2-1. 메모리와 데이터

- 비트(bit) : 0 또는 1만 표현할 수 있는 하나의 메모리 조각
  - 각 비트는 고유한 식별자를 통해 위치를 확인할 수 있음
- 비트 단위로 위치를 확인하는 것은 매우 비효율적이기 때문에 묶어서 하나의 단위로 표현
  - 낭비되는 비트가 생기기도 함
- 바이트(byte) : 8비트로 구성
  - 2의 8승(256)개의 값을 표현할 수 있음
  - 2바이트 : 16비트 => 65536(2의 16승)개의 값을 표현할 수 있음
- c/c++

  - short : 2바이트 => -32768 ~ +32767
  - int : 4바이트
  - float
  - double

- javascript

  - 메모리 용량이 과거보다 커졌으므로 자바스크립트는 넉넉하게 할당함
  - 숫자를 정수형인지 부동소수형인지 구분하지 않고 8바이트(= 64비트)를 확보

- 바이트 역시 시작하는 비트의 식발자로 위치를 파악
- 모든 데이터는 바이트 단위의 식별자, `메모리 주솟값`을 통해 서로 구분하고 연결 할 수 있음

### 1-2-2. 식별자와 변수

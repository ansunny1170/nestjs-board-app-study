import { userInfo } from 'os'
import { User } from 'src/auth/user.entity'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BoardStatus } from './board-status.enum'

@Entity() //Entity() 데코레이터 클래스는 Board 클래스가 엔티티임을 나타내는 데
// 사용된다. CREATE TABLE board 부분이다.
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // PrimaryGeneratedColumn() 데코레이터 클래스는
  // id 열이 Board 엔티티의 기본 키 열임을 나타내는 데 사용된다.
  id: number

  @Column() // Column() 데코레이터 클래스는 Board 엔티티의
  //title 및 description과 같은 다른 열을 나타내는 데 사용된다.
  title: string

  @Column()
  description: string

  @Column()
  status: BoardStatus

  @ManyToOne(type => User, user => user.boards, { eager: false })
  user: User
  // 첫 번째 파라미터: type => User, 타입을 넣어준다.
  // 두 번째 파라미터: 여기 보드에서 유저에 접근하려면 타입 Board로 선언한 boards의 user 컬럼을 가리켜 명시한다.
  // eager: false는 여기의 보드 정보를 가져올 때 user정보는 안가져 온다라는 뜻이다.
}

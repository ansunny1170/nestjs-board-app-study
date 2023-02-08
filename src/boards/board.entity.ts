import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "./board-status.enum";

@Entity() //Entity() 데코레이터 클래스는 Board 클래스가 엔티티임을 나타내는 데
// 사용된다. CREATE TABLE board 부분이다.
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() // PrimaryGeneratedColumn() 데코레이터 클래스는
    // id 열이 Board 엔티티의 기본 키 열임을 나타내는 데 사용된다.
    id: number;

    @Column() // Column() 데코레이터 클래스는 Board 엔티티의
    //title 및 description과 같은 다른 열을 나타내는 데 사용된다.
    title: string;

    @Column()
    description: string;
    
    @Column()
    status: BoardStatus;
}
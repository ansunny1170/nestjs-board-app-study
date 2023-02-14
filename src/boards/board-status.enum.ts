// local memory 사용 시, DB사용 하면서 file name을 <board.model.ts> 에서 <board-status.enum.ts> 로 변경한다.
// export interface Board {
//     id: string;
//     title: string;
//     description: string;
//     status: BoardStatus;
// }

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

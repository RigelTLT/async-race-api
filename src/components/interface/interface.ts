export interface IparamsCar{
  name: string;
  color: string;
}
export interface Iparams{
  _page: string;
  _limit: string;
}
export interface ICarBase{
  name: string;
  color: string;
  id: number;
}
export interface IparamsSortWinners{
  _page: string;
  _limit: string;
  _sort: string;
  _order: string;
}
export interface IWinner{
  id: number;
  wins: number;
  time: number;
}
export interface IparamsWinner{
  wins: number;
  time: number;
}
import { IRefDataModel, RefDataModel } from '../model/ref-data-model';

const refData: IRefDataModel = new RefDataModel();

export const postInitialState = {
  dateTime: '',
  title: '',
  refDataArray: [refData.createNewRefData()],
  publish: false,
};

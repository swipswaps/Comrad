import axios from 'axios';
import { ROOT_CONFIG_URL } from '../root';

export function getInComplianceReportingPeriodSetting(modelName) {
  return axios.get(`${ROOT_CONFIG_URL}/compliance-reporting-period`);
}

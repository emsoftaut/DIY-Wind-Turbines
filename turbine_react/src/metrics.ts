type MetricsParams = {
  id: string;
  voltage: number;
  stepperState: number;
  kp: number;
  ki: number;
  kd: number;
};
export default class Metrics {
  id: string;
  voltage: number;
  stepperState: number;
  kp: number;
  ki: number;
  kd: number;

  constructor(params: MetricsParams) {
    this.id = params.id;
    this.voltage = params.voltage;
    this.stepperState = params.stepperState;
    this.kp = params.kp;
    this.ki = params.ki;
    this.kd = params.kd;
  }
}

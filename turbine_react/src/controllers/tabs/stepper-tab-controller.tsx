import React from "react";
import StepperTab from "../../components/tabs/stepper-tab";
import { Settings, Turbine, updateSettings } from "../../models/turbine-model";

type StepperTabProps = {
  selected: Turbine | undefined;
};

const StepperTabController: React.FC<StepperTabProps> = (
  props: StepperTabProps
) => {
  const [stepperState, setStepperState] = React.useState<number>(
    props.selected ? props.selected.stepperState : 0
  );
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!props.selected) {
      return;
    }
    console.log("GOT HERE");

    const { id } = props.selected;

    const form = e.target as HTMLFormElement;
    const rpm = parseInt((form.rpm as HTMLInputElement).value);
    const steps = parseInt((form.steps as HTMLInputElement).value);

    const fetchData = async () => {
      let settings: Settings = {
        id,
        stepperState: stepperState,
      };

      if (!isNaN(steps)) {
        settings.steps = steps;
      }
      if (!isNaN(rpm)) {
        settings.rpm = rpm;
      }
      if (id !== "") {
        settings.id = id;
      }
      return updateSettings(settings);
    };
    fetchData().catch(console.error);
  };

  const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepperState(parseInt(e.target.value));
  };

  return (
    <StepperTab
      onFormSubmit={onFormSubmit}
      onStateChange={onStateChange}
      stepperState={stepperState}
    />
  );
};
export default StepperTabController;

const rollStatesAllowedValues = ["unmark", "present", "absent", "late"];

import Joi from "joi";
import { RollState } from "types/roll.interface";

const customRollStatesValidator = (value: any, helper: any): any => {
  let allowed = true;
  let strippedValues = value.split(",");
  strippedValues.forEach((val: RollState) => {
    if (!rollStatesAllowedValues.includes(val)) {
      allowed = false;
    }
  });

  if (!allowed) return helper.error("Invalid Roll State Value Entered");
  if (allowed) return value;
};

const create = Joi.object({
  name: Joi.string().required(),
  number_of_weeks: Joi.number().required(),
  roll_states: Joi.string()
    .required()
    .custom(customRollStatesValidator, "Custom RollStates Validator"),
  incidents: Joi.number().required(),
  ltmt: Joi.string().valid("<", ">").required(),
});

const update = Joi.object({
  name: Joi.string().optional(),
  number_of_weeks: Joi.number().optional(),
  roll_states: Joi.string()
    .optional()
    .custom(customRollStatesValidator, "Custom RollStates Validator"),
  incidents: Joi.number().optional(),
  ltmt: Joi.string().valid("<", ">").optional(),
});

export default { create, update };

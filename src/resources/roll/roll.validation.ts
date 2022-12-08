import Joi from "joi";

const create = Joi.object({
  name: Joi.string().required(),
  completed_at: Joi.date().required(),
});

const addStudentRollStates = Joi.array().items(
  Joi.object().keys({
    student_id: Joi.number().required(),
    roll_id: Joi.number().required(),
    state: Joi.string().valid("unmark", "present", "absent", "late"),
  })
);

export default {create,addStudentRollStates}
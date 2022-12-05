import {
  BookingQuestion,
  LocationPoints,
} from 'thingsToDo/types/response/ThingsDetailResponse';

const widgets: any = {
  PICKUP_POINT: 'PickupPoint',
  NUMBER_AND_UNIT: 'NumberUnit',
};

const defaultPickup = {
  allow_custom_location: true,
  options: ['PICKUP'],
  description: '',
  locations: [
    {
      location: {
        ref: '',
        provider: '',
        name: '',
      },
      pickup_type: 'OTHER',
    },
  ],
};

export const getQuestionsSchema = (
  questions: BookingQuestion[],
  pickupPoints?: LocationPoints,
) => {
  const { schema, uiSchema } = getSchemasLayout();
  questions?.forEach((question: BookingQuestion) => {
    const {
      id,
      hint,
      is_required: isRequired,
      answer_options: answerOptions,
      answer_units: answerUnits,
      is_conditional: isConditional,
    } = question;

    uiSchema[id] = {};
    uiSchema[id]['ui:placeholder'] = hint;

    const { property, isConditionalQuestion } = getBasePropertyMock(question);
    const widgetType = getWidgetType(question);

    const widgetData: any = {
      PICKUP_POINT: pickupPoints || defaultPickup,
      NUMBER_AND_UNIT: answerUnits,
    };
    property.data = widgetData[widgetType];

    const widget = widgets[widgetType];
    widget && (uiSchema[id]['ui:widget'] = widget);
    isRequired && schema.required.push(id);

    property.enum = answerOptions?.map((option) => option.answer);
    property.default = answerOptions?.[0]?.answer;

    if (isConditionalQuestion) {
      property.properties = getConditionalQuestionProperties(question);
      property.dependencies = getQuestionDependencies(question, questions);
      const conditionalUi = getConditionalPropertyUiSchema(question, questions);
      uiSchema[id] = conditionalUi.uiSchema[id];
      property.required = conditionalUi.required;
    }

    !isConditional && (schema.properties[id] = property);
  });

  return { schema, uiSchema };
};

export const getTravelerQuestionSchema = (
  questions: BookingQuestion[],
  pickupPoints?: LocationPoints,
) => {
  const travelerQuestions = questions?.filter(
    (question) => question?.grouping === 'PER_TRAVELER',
  );
  const travelerSchema = getQuestionsSchema(travelerQuestions, pickupPoints);
  return travelerQuestions?.length ? travelerSchema : null;
};

export const getBookingQuestionSchema = (
  questions: BookingQuestion[],
  pickupPoints?: LocationPoints,
) => {
  const bookingQuestions = questions?.filter(
    (question) => question?.grouping === 'PER_BOOKING',
  );
  const bookingSchema = getQuestionsSchema(bookingQuestions, pickupPoints);
  return bookingQuestions?.length ? bookingSchema : null;
};

const getWidgetType = (question: BookingQuestion) => {
  const isPickupPoint = question?.id === 'PICKUP_POINT';
  const widgetType = isPickupPoint ? question?.id : question?.answer_type;
  return widgetType;
};

const getSchemasLayout = () => {
  const schema: any = {
    type: 'object',
    properties: {},
    required: [],
  };
  const uiSchema: any = {};
  return { schema, uiSchema };
};

const getBasePropertyMock = (question: BookingQuestion) => {
  const {
    label,
    answer_options: answerOptions,
    answer_max_length: maxLength,
  } = question;
  const isConditionalQuestion = answerOptions?.[0]?.related_question_ids;
  const property: any = {
    type: isConditionalQuestion ? 'object' : 'string',
    title: isConditionalQuestion ? '' : label,
    maxLength,
  };
  return {
    property,
    isConditionalQuestion,
  };
};

const getConditionalPropertyUiSchema = (
  question: BookingQuestion,
  questions: BookingQuestion[],
) => {
  const uiSchema: any = {};
  const required: string[] = [];
  const { answer_options: options, id } = question;
  uiSchema[id] = {};
  options?.forEach((option) => {
    const questionIds = option?.related_question_ids;
    questionIds?.forEach((relatedQuestionId) => {
      const relatedQuestion = questions.find(
        (question) => question.id === relatedQuestionId,
      );
      const widgetType = getWidgetType(relatedQuestion as BookingQuestion);
      uiSchema[id][relatedQuestionId] = {
        'ui:placeholder': relatedQuestion?.hint,
        'ui:widget': widgets[widgetType],
      };
      if (relatedQuestion?.is_required) required.push(relatedQuestionId);
    });
  });
  return { uiSchema, required };
};

const getConditionalQuestionProperties = (question: BookingQuestion) => {
  const { label, answer_options: answerOptions, id } = question;
  const properties = {
    [id]: {
      title: label,
      type: 'string',
      enum: answerOptions?.map((option) => option.answer),
      default: answerOptions?.[0]?.answer,
    },
  };
  return properties;
};

const getQuestionDependencies = (
  question: BookingQuestion,
  questions: BookingQuestion[],
  pickupPoints?: LocationPoints,
) => {
  const { answer_options: answerOptions, id } = question;
  const oneOf = answerOptions?.map((option) => {
    const properties: any = {
      [id]: { enum: [option.answer] },
    };
    option?.related_question_ids?.forEach((relatedQuestionId) => {
      const relatedQuestion = questions.find(
        (question) => question.id === relatedQuestionId,
      );
      const widgetData: any = {
        PICKUP_POINT: pickupPoints || defaultPickup,
        NUMBER_AND_UNIT: relatedQuestion?.answer_units,
      };
      const widgetType = getWidgetType(relatedQuestion as BookingQuestion);
      properties[relatedQuestionId] = {
        type: 'string',
        title: relatedQuestion?.label,
        data: widgetData[widgetType],
      };
    });
    return { properties };
  });

  return {
    [id]: { oneOf },
  };
};

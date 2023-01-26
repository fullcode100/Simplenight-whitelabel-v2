import {
  AnswerOption,
  BookingQuestion,
  LocationPoints,
} from 'thingsToDo/types/response/ThingsDetailResponse';
import { defaultPickup, widgets } from './questionDefaults';

export const getItemQuestionSchemas = (item: any) => {
  const travelerSchema = getQuestionSchemaByGrouping(item, 'PER_TRAVELER');
  const bookingSchema = getQuestionSchemaByGrouping(item, 'PER_BOOKING');
  return { travelerSchema, bookingSchema };
};

export const getQuestionSchemaByGrouping = (item: any, grouping?: string) => {
  const questions = item?.item_data?.extra_data?.booking_questions;
  const pickupPoints = item?.item_data?.extra_data?.pickup;
  const productCode = item?.booking_data?.product_code;
  const questionsByGrouping = questions?.filter(
    (question: any) =>
      question?.grouping === grouping &&
      question?.id !== 'LANG_GUIDE' &&
      question?.id !== 'AGEBAND',
  );
  const itemQuestionLanguage = questions?.find(
    (question: any) =>
      question?.grouping === grouping &&
      question?.id === 'LANG_GUIDE' &&
      question?.option_code === productCode,
  );
  if (itemQuestionLanguage) questionsByGrouping.push(itemQuestionLanguage);
  const schema = getQuestionsSchema(questionsByGrouping, pickupPoints);
  return questionsByGrouping?.length ? schema : null;
};

export const getQuestionsSchema = (
  questions: BookingQuestion[],
  pickupPoints?: LocationPoints,
) => {
  const schema: any = {
    type: 'object',
    properties: {},
    required: [],
  };
  const uiSchema: any = {};
  questions?.forEach?.((question: BookingQuestion) => {
    if (!question) return;
    const {
      label,
      id,
      hint,
      isRequired,
      answerOptions,
      answerUnits,
      isConditional,
      maxLength,
      hasRelatedQuestions,
    } = questionAdapter(question);

    uiSchema[id] = {};
    uiSchema[id]['ui:placeholder'] = hint;

    const property: any = {
      type: hasRelatedQuestions ? 'object' : 'string',
      title: hasRelatedQuestions ? '' : label,
      maxLength,
    };
    const widgetType = getWidgetType(question);

    const widgetData: any = {
      PICKUP_POINT: pickupPoints || defaultPickup,
      NUMBER_AND_UNIT: answerUnits,
    };
    property.data = widgetData[widgetType] || answerOptions;

    const widget = getWidget(question);
    widget && (uiSchema[id]['ui:widget'] = widget);
    isRequired && schema.required.push(id);

    property.enum = answerOptions?.map((option) => option.answer);
    property.default = answerOptions?.[0]?.answer;

    if (hasRelatedQuestions) {
      property.properties = getRelatedQuestionProperties(question);
      property.dependencies = getQuestionDependencies(
        question,
        questions,
        pickupPoints,
      );
      const conditionalUi = getRelatedPropertyUiSchema(question, questions);
      uiSchema[id] = conditionalUi.uiSchema[id];
      property.required = conditionalUi.required;
    }

    !isConditional && (schema.properties[id] = property);
  });

  return { schema, uiSchema };
};

const getRelatedPropertyUiSchema = (
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
      const widget = getWidget(relatedQuestion as BookingQuestion);
      uiSchema[id][relatedQuestionId] = {
        'ui:placeholder': relatedQuestion?.hint,
        'ui:widget': widget,
      };
      if (relatedQuestion?.is_required) required.push(relatedQuestionId);
    });
  });
  return { uiSchema, required };
};

const getRelatedQuestionProperties = (question: BookingQuestion) => {
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

const getWidgetType = (question: BookingQuestion) => {
  const numberAndUnit = 'NUMBER_AND_UNIT';
  const isNumberUnit = question?.answer_type === numberAndUnit;
  const widgetType = isNumberUnit ? numberAndUnit : question?.id;
  return widgetType;
};

const getWidget = (question: BookingQuestion) => {
  return widgets[question?.id] || widgets[question?.answer_type];
};

const questionAdapter = (question: BookingQuestion) => {
  const { answer_options: answerOptions } = question;
  const hasRelatedQuestions = !!answerOptions?.[0]?.related_question_ids;
  return {
    label: question.label,
    id: question.id,
    hint: question.hint,
    isRequired: question?.is_required,
    answerUnits: question?.answer_units,
    isConditional: question?.is_conditional,
    maxLength: question?.answer_max_length,
    answerOptions,
    hasRelatedQuestions,
  } as BookingQuestionAdapt;
};

export interface BookingQuestionAdapt {
  label: string;
  id: string;
  hint: string;
  isRequired: boolean;
  answerOptions: AnswerOption[];
  answerUnits: string[];
  isConditional: boolean;
  maxLength: number;
  hasRelatedQuestions: boolean;
}

import { Middleware } from "@reduxjs/toolkit";

const defaultMiddlewares: Middleware = (store) => (next) => (action: any) => {
  const result = next(action);

  const actionsToPersist = [
    "survey/setDinasId",
    "survey/setLayananId",
    "survey/setTanggal",
    "survey/setDataSurvei",
  ];

  if (actionsToPersist.includes(action.type)) {
    const state = store.getState().survey;
    localStorage.setItem("surveyState", JSON.stringify(state));
  }

  return result;
};

export default defaultMiddlewares;

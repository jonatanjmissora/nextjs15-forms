"use server";

import { todoSchema, TodoType } from "../_lib/schema/todo.schema";

export type FormState = {
  success: boolean;
  message: string;
};

export const addTodo = async (
  newTodo: TodoType
): Promise<FormState> => {

  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  //server validation
  const { success: serverSuccess } = todoSchema.safeParse(newTodo)
  if (!serverSuccess) {
    return { success: false, message: "Server Validation Fail" }
  }

  if (newTodo.title === "error") return { success: false, message: "No puede contener error" }

  try {
    //insertar en DB
    return { success: true, message: "Todo creado satisfactoriamente" }
  } catch (error) {
    return { success: false, message: JSON.stringify(error) || "Server Error" }
  }

}
"use server";

import { todoSchema, TodoType } from "../_lib/schema/todo.schema";

export type FormState = {
  success: boolean;
  prevState: Record<string, string>;
  message: string;
};

export const addTodo = async (
  newTodo: TodoType
): Promise<FormState> => {

  await new Promise(resolve => setTimeout(resolve, 1000))	// Simulate server latency

  //server validation
  const { success: serverSuccess } = todoSchema.safeParse(newTodo)
  if (!serverSuccess) {
    return { success: false, prevState: newTodo, message: "Server Validation Fail" }
  }

  if (newTodo.title === "error") return { success: false, prevState: newTodo, message: "No puede contener error" }

  try {
    //insertar en DB
    return { success: true, prevState: newTodo, message: "Todo creado satisfactoriamente" }
  } catch (error) {
    return { success: false, prevState: newTodo, message: JSON.stringify(error) || "Server Error" }
  }

}
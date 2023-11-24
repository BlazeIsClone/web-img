"use server";

export async function download(formData: FormData) {
  const files = formData.getAll("files[]");
}

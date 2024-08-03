export const sleep = async (ms = 200) => {
  const promisik = new Promise((resolve) => setTimeout(resolve, ms));
  const resolvik = await promisik;
};

export const unshiftAfterMs = async (state: any, ms = 200) => {
  await sleep();
  state.error.pop();
};

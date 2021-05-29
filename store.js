import create from "./modules/vanilla.js";

const store = create(() => ({
  isAuth: false,
  data: [],
}));

export default store;

store.subscribe((data) => {
  console.log(data);
});

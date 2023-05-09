const selectFilter = (input, option) =>
  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

export { selectFilter };

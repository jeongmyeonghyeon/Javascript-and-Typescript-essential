const userName = "Jeong myeonghyeon";
const bolder = (text) => `<b>${text}</b>`;

console.log(`HI~ ${userName}`);

console.log(`HI~ ${bolder(userName)}`);

function div(strings, ...fns) {
  const flat = (s) => s.split("\n").join("");

  return function (props) {
    return `<div style="${
      flat(strings[0]) + (fns[0] && fns[0](props)) + flat(strings[1])
    }"</div>`;
  };
}

const Div = div`
    font-size: 20px;
    color: ${(props) => (props.active ? "white" : "gray")};
    border: none;
`;

console.log(Div({ active: false }));

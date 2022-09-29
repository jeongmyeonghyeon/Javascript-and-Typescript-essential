function main() {
  const BUBBLING_PHASE = false;
  const CAPTURING_PHASE = true;
  const PHASE_NAME = ["NONE", "CAPTURING", "TARGET", "BUBBLING"];

  function eventLogger({ target, currentTarget, eventPhase }) {
    // console.log("eventPhase", eventPhase);
    console.log(
      `${target.dataset.name}, ${currentTarget.dataset.name}, ${PHASE_NAME[eventPhase]}`
    );
  }

  let divs = document.querySelectorAll("div");
  divs.forEach((div) =>
    div.addEventListener("click", eventLogger, CAPTURING_PHASE)
  );
}

document.addEventListener("DOMContentLoaded", main);

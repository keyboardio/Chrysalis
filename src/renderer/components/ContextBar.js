const context_bar_channel = new BroadcastChannel("context_bar");

export const showContextBar = () => {
  context_bar_channel.postMessage("show");
};

export const hideContextBar = () => {
  context_bar_channel.postMessage("cancel");
};

export const contextBarChangesDiscarded = () => {
  console.log("posting a changes-discarded message");
  context_bar_channel.postMessage("changes-discarded");
};

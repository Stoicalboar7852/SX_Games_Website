var gameInstance;

gameInstance = UnityLoader.instantiate("gameContainer", "/js/itchio.json", {
  onProgress: UnityProgress,
  Module: {
    onRuntimeInitialized: function () {
      UnityProgress(gameInstance, "complete");
    },
  },
});

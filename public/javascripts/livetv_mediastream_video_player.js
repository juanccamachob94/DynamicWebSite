class LivetvMediastreamVideoPlayer extends MediastreamVideoPlayer {
  constructor(htmlId, basicOptions, livetvModule) {
    super(htmlId, basicOptions);
    this.fullscreenStatus = "off"; // on, off
    this.livetvModule = livetvModule;
    this.videoId = this.getVideoId();
    this.init();
    this.isVideoDoubleClickValidation = false;
    this.playerVideoUpdated = false;
  }

  init() {
    setTimeout(super.init.bind(this), 0);
    setTimeout(this.initHtmlVariables.bind(this), 0);
  }

  initHtmlVariables() {
    this.glideContainer = $('.tv-slider').find('.glide');
    this.sliderContainerPreview = $('#slider-container-preview-' + this.videoId);
    this.sliderContainerPlayer = $('#slider-container-player-' + this.videoId);
  }

  onFullscreenChange() {
    if(this.fullscreenStatus == "off")
      this.fullscreenStatus = "on";
    else
      this.fullscreenStatus = "off";
    this.livetvModule.fullscreenEvent = this.fullscreenStatus;

    if(!this.playerVideoUpdated && this.fullscreenStatus == "off")
      setTimeout(this.showPreview.bind(this), 500);
  }

  updateVideoPlayer() {
    this.player.seekTo(-1, undefined);
    this.playerVideoUpdated = true;
  }

  onPlay() {
    if(this.playerVideoUpdated)
      return;
    this.isVideoDoubleClickValidation = true;
    this.updateVideoPlayer();
    setTimeout(this.stopPlayingOtherVideos.bind(this), 0);
    setTimeout(() => {
      this.livetvModule.showAllPreviews().then(this.showPlayer.bind(this))
    }, 0);
    setTimeout(this.positionGlide.bind(this), 0);
  }

  /* Calling the showAllPreviews() function and then the showPlayer() function. */
  onTimeUpdate() {
    if(this.isVideoDoubleClickValidation && this.sliderContainerPlayer.hasClass('hidden')) {
      if(this.livetvModule.mediastreamVideoPlayers[this.videoId])
        this.livetvModule.mediastreamVideoPlayers[this.videoId].player.videoStop();
      this.isVideoDoubleClickValidation = false;
    }
  }
  
  onVideoError() {
    if(this.livetvModule.mediastreamVideoPlayers[this.videoId] != undefined)
      this.livetvModule.mediastreamVideoPlayers[this.videoId].player.destroy();
    delete this.livetvModule.mediastreamVideoPlayers[this.videoId];
    this.showPreview();
  }

  onVideoStop() {
    this.playerVideoUpdated = false;
    if(this.livetvModule.isFullscreen())
      return;
    setTimeout(this.showPreview.bind(this), 500);
  }

  positionGlide() {
    var sliderIndex = parseInt(this.sliderContainerPlayer.data('sliderIndex'));
    if(this.livetvModule.glide.index == sliderIndex)
      return
    var movementDirection = this.livetvModule.glide.index < sliderIndex ? '>' : '<';

    const interval = setInterval(() => {
      this.livetvModule.glide.go(movementDirection);
      if(this.livetvModule.glide.index == sliderIndex)
        clearInterval(interval);
    }, 0);
  }

  stopPlayingOtherVideos() {
    let player = undefined;
    for (var identifier in this.livetvModule.mediastreamVideoPlayers)
      if(this.videoId != identifier) {
        player = this.livetvModule.mediastreamVideoPlayers[identifier].player;
        if(player.isPlaying())
          player.videoStop();
      }
  }

  showPlayer() {
    if(this.sliderContainerPreview.hasClass('hidden'))
      return;
    this.sliderContainerPreview.addClass('hidden');
    this.sliderContainerPlayer.removeClass('hidden');
  }

  showPreview() {
    if(this.sliderContainerPlayer.hasClass('hidden'))
      return;
    this.sliderContainerPlayer.addClass('hidden');
    this.sliderContainerPreview.removeClass('hidden');
    let playTvButton = this.sliderContainerPreview.find('.play-tv-button');
    if(playTvButton.hasClass('hidden'))
      playTvButton.removeClass('hidden');
  }

  getVideoId() {
    let data = this.htmlId.split('-');
    return data[data.length - 1];
  }
}

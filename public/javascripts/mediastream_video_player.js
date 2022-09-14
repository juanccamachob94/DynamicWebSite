class MediastreamVideoPlayer {
  constructor(htmlId, basicOptions) {
    this.htmlId = htmlId;
    this.basicOptions = basicOptions;
    this.events = {};
    this.player = undefined;
  }

  init() {
    this.bindEvents();
    this.initPlayer();
  }

  bindEvents() {
    this.events = {
      onAdsComplete: this.onAdsComplete.bind(this),
      onAdsFirstQuartile: this.onAdsFirstQuartile.bind(this),
      onAdsMidpoint: this.onAdsMidpoint.bind(this),
      onAdsPaused: this.onAdsPaused.bind(this),
      onAdsResumed: this.onAdsResumed.bind(this),
      onAdsSkipped: this.onAdsSkipped.bind(this),
      onAdsStarted: this.onAdsStarted.bind(this),
      onAdsThirdQuartile: this.onAdsThirdQuartile.bind(this),
      onAdsUserClose: this.onAdsUserClose.bind(this),
      onBuffering: this.onBuffering.bind(this),
      onFullscreenChange: this.onFullscreenChange.bind(this),
      onPlay: this.onPlay.bind(this),
      onPlayerReady: this.onPlayerReady.bind(this),
      onReplay: this.onReplay.bind(this),
      onSeeked: this.onSeeked.bind(this),
      onSeeking: this.onSeeking.bind(this),
      onTimeUpdate: this.onTimeUpdate.bind(this),
      onVideoEnd: this.onVideoEnd.bind(this),
      onVideoError: this.onVideoError.bind(this),
      onVideoStop: this.onVideoStop.bind(this),
      onVolumeChange: this.onVolumeChange.bind(this),
    }
  }

  initPlayer() {
    this.player = new MediastreamPlayer(this.htmlId, this.getOptions());
  }

  getOptions() {
    return { ...this.basicOptions, ...{ events: this.events } };
  }

  onAdsComplete() {
  }

  onAdsFirstQuartile() {
  }

  onAdsMidpoint() {
  }

  onAdsPaused() {
  }

  onAdsResumed() {
  }

  onAdsSkipped() {
  }

  onAdsStarted() {
  }

  onAdsThirdQuartile() {
  }

  onAdsUserClose() {
  }

  /**
   * almost always runs after onSeeking (load the data?)
   */
  onBuffering() {
  }

  /**
   * full screen changes
   */
  onFullscreenChange() {
  }

  /**
   * when user clicks to play the media content
   */
  onPlay() {
  }

  /**
   * when the player is ready to interactions (is executed twice)
   * when the page is loaded or specific part is loaded and that is ready to continue
   */
  onPlayerReady() {
  }

  /**
   * click on the play to view content again or click on the little button to repeat the content
   */
  onReplay() {
  }

  onSeeked() {
  }

  /**
   * search content from source
   * when user clicks on previous (or next) 10 seconds button or click on the progress bar
   */
  onSeeking() {
  }

  /**
   * while the media is running
   */
  onTimeUpdate() {
  }

  /**
   * video ends
   */
  onVideoEnd() {
  }

  onVideoError() {
  }

  /**
   * when user clicks to pause the media content
   */
  onVideoStop() {
  }

  /**
   * any volume change
   */
  onVolumeChange() {
  }
}

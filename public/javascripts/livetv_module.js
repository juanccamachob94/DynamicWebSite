class LivetvModule {
  constructor() {
    this.fullscreenEvent = undefined;
    this.lastDateTimeToFullscreen = undefined;
    this.mediastreamVideoPlayers = {};
    this.init();
    this.bindEvents();
  }

  init() {
    this.module = $('#livetv-module');
    this.cancelIfNoContent();
    this.initHtmlVariables();
    this.initDynamicDependencies().then(this.saveEmptyGlideSlidesException.bind(this));
  }

  initDynamicDependencies() {
    return new Promise((resolve, reject) => {
      this.initGlide().then(this.defineDimensions.bind(this));
      resolve();
    });
  }

  saveEmptyGlideSlidesException() {
    var interval = setInterval(() => {
      this.resetMediastreamPlayers();
      if(this.glideSlides.css('height') != '0px')
        clearInterval(interval);
    }, 800);
  }

  initHtmlVariables() {
    this.slider = this.module.find('.tv-slider');
    this.glideSlides = this.slider.find('.glide__slides');
    this.sectionImage = this.slider.find('img.section-image');
    this.sectionEmptyImage = this.slider.find('.section-empty-image');
    this.sliderContainerPlayer = this.slider.find('.slider-container.player');
    this.sliderContainerPreviews = $('.slider-container.preview');
    this.sliderContainerPlayers = $('.slider-container.player');
  }

  setMediastreamVideoPlayerDimensions() {
    let sliderContainer = this.module.find('.slider-container');
    this.mediastreamVideoPlayerWidth = parseInt(sliderContainer.css('width').replace('px', ''));
    this.mediastreamVideoPlayerHeight = parseInt(sliderContainer.css('height').replace('px', ''));
  }

  initGlide() {
    return new Promise((resolve, reject) => {
      this.glide = new Glide('#livetv-module .main-glide', {
        draggable: true,
        type: 'slider',
        focusAt: 'center',
        perView: 2,
        startAt: 0
      });
      this.glide.mount();
      resolve();
    });
  }

  defineDimensions() {
    this.adjustSliderStyles().then(this.setMediastreamVideoPlayerDimensions.bind(this));
  }

  adjustSliderStyles() {
    return new Promise((resolve, reject) => {
      if(this.sectionImage.length) {
        let sectionImageHeight = this.sectionImage.css('height');
        let sectionImageWidth = this.sectionImage.css('width');

        this.setDimensions(this.sectionEmptyImage, sectionImageWidth, sectionImageHeight);
        this.setDimensions(this.sliderContainerPlayer, sectionImageWidth, sectionImageHeight);
        this.glideSlides.css('height', sectionImageHeight);
      }
      resolve();
    });
  }

  resetMediastreamPlayers() {
    this.stopPlayingVideos();
    this.showAllPreviews().then(this.defineDimensions.bind(this));
    this.mediastreamVideoPlayers = {};
  }

  bindEvents() {
    this.bindWindowResize();
    this.bindPlayButtons();
  }

  bindPlayButtons() {
    var _this = this;
    this.module.find('.tv-button, .play-tv-button').on('click', function () {
      var videoId = $(this).data('mdstrmIdentifier');
      setTimeout(_this.launchMediastreamPlayer.bind(_this, videoId), 0);
      
      setTimeout(() => {
        var playTvButton = _this.slider.find(`#slider-container-preview-${videoId}`)
          .find('.play-tv-button');
        playTvButton.addClass('hidden');

        var interval = setInterval(() => {
          let mediastreamVideoPlayer = _this.mediastreamVideoPlayers[videoId];
          if(mediastreamVideoPlayer && mediastreamVideoPlayer.player.isPlaying()) {
            playTvButton.removeClass('hidden');
            clearInterval(interval);
          }
        }, 100);
      }, 500); 
    });
  }

  isVideoFullScreenEvent() {
    let res = this.fullscreenEvent != undefined;
    this.fullscreenEvent = undefined;
    return res;
  }

  bindWindowResize() {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        if(this.isVideoFullScreenEvent())
          this.lastDateTimeToFullscreen = new Date().getTime();
        else if(this.lastDateTimeToFullscreen == undefined ||
          new Date().getTime() - this.lastDateTimeToFullscreen > 1000)
          this.resetMediastreamPlayers();
      }, 500);
    });
  }

  launchMediastreamPlayer(videoId) {
    if(this.mediastreamVideoPlayers[videoId])
      this.mediastreamVideoPlayers[videoId].player.videoPlay();
    else {
      this.mediastreamVideoPlayers[videoId] =
        new LivetvMediastreamVideoPlayer(`mdstrm-player-${videoId}`, {
          width: this.mediastreamVideoPlayerWidth,
          height: this.mediastreamVideoPlayerHeight,
          type: 'live',
          id: videoId,
          autoplay: true
        },
      this);
      this.mediastreamVideoPlayers[videoId].init();
    }
  }

  stopPlayingVideos() {
    let player = undefined;
    for (let identifier in this.mediastreamVideoPlayers) {
      player = this.mediastreamVideoPlayers[identifier].player;
      if(player.isPlaying()) 
        player.videoStop();
    }
  }

  showAllPreviews() {
    return new Promise((resolve, reject) => {
      this.sliderContainerPreviews.removeClass('hidden');
      this.sliderContainerPreviews.find('.play-tv-button').removeClass('hidden');
      this.sliderContainerPlayers.addClass('hidden');
      resolve();
    });
  }

  setDimensions(element, width, height) {
    if(!element.length)
      return;
    element.css('width', width);
    element.css('height', height);
  }

  cancelIfNoContent() {
    if(this.areAllChannelsDisabled()) {
      $('#livetv-module').addClass('hidden');
      return;
    }
  }

  areAllChannelsDisabled() {
    return this.module.find('.tv-buttons-container').find('.tv-button.disabled').length == 5;
  }

  isFullscreen() {
    return !!(document.fullscreenElement || document.mozFullScreenElement
      || document.onwebkitanimationendFullscreenElement || document.msFullscreenElement);
  }
}

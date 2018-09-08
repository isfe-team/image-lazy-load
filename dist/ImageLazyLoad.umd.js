/*!
 * ImageLazyLoad | @bqliu @hxli
 * a simple image lazy load library
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.$$ImageLazyLoad = factory());
}(this, (function () { 'use strict';

  /**
   * core implementation of lazy load images
   *
   * @example
   */
  var ImageLazyLoad = function ImageLazyLoad (container, ref) {
    if ( container === void 0 ) container = document.documentElement;
    if ( ref === void 0 ) ref = { };
    var preloadHeight = ref.preloadHeight; if ( preloadHeight === void 0 ) preloadHeight = 0;
    var delay = ref.delay; if ( delay === void 0 ) delay = 0;

    this.container = container;
    this.option = { preloadHeight: preloadHeight, delay: delay };

    // maintain standalone timer
    this.timer = null;

    // bind this
    this.containerScrollHandler = this._onScroll.bind(this);

    // and call it at first
    this.containerScrollHandler();
  };

  /**
   * initialize
   *
   * @private
   */
  ImageLazyLoad.prototype._init = function _init () {
    this.container.addEventListener('scroll', this.containerScrollHandler);
  };

  /**
   * unbind events
   *
   * @private
   */
  ImageLazyLoad.prototype._unbindEvents = function _unbindEvents () {
    this.container.removeEventListener('scroll', this.containerScrollHandler);
  };

  /**
   * scroll listener
   *
   * @private
   */
  ImageLazyLoad.prototype._onScroll = function _onScroll () {
      var this$1 = this;

    clearTimeout(this.timer);

    this.timer = setTimeout(function () {
      this$1._loadImagesCore();
    }, this.option.delay);
  };

  /**
   * load image core implementation
   *
   * @private
   */
  ImageLazyLoad.prototype._loadImagesCore = function _loadImagesCore () {
    var images = this.container.querySelectorAll('img');
    var containerScrollTop = this.container.scrollTop;
    var containerHeight = this.container.offsetHeight;

    // load condition
    // containerHeight + preloadHeight + containerScrollTop > the image's offsetTop
    // in some layout, if one image fits this condition, the following images fit, too.
    // this can be set a configuration.
    var hasNotLoadedImages = [].concat( images ).filter(function (image) {
      var loadedThisImage = image.dataset['__loaded'];
      var hasSrc = image.dataset('src');

      // hasn't loaded & has src
      return !loadedThisImage && hasSrc
    });

    if (hasNotLoadedImages.length === 0) {
      this._unbindEvents();
      return
    }

    hasNotLoadedImages.filter(function (image) {
      // and fit condition
      return containerHeight + preloadHeight + containerScrollTop > image.offsetTop
    })
      .forEach(function (image) {
        var rawSrc = image.dataset('src');
        image.src = rawSrc;

        image.dataset['__loaded'] = true;
      });
  };

  /**
   * destroy
   *
   * @public
   */
  ImageLazyLoad.prototype.destroy = function destroy () {
    clearTimeout(this.timer);
    this._unbindEvents();
    this.container = null;
    this.option = null;
    this.timer = null;
  };

  return ImageLazyLoad;

})));

//# sourceMappingURL=ImageLazyLoad.umd.js.map

/**
 * core implementation of lazy load images
 *
 * @example
 */
class ImageLazyLoad {
  /**
   * constructor
   *
   * @param {HTMLElement} container - the dom wrapper you want to lazy load images
   * @param {Object} option - configure the other behaviour
   * @param {number} option.preloadHeight - extra downside height that will preload, default is 0
   * @param {numbes} option.delay - delay to optimize high speed scroll, default is 0
   */
  constructor ({ preloadHeight = 0, delay = 0 } = { }, container = document ) {
    this.container = container
    this.option = { preloadHeight, delay }

    // maintain standalone timer
    this.timer = null

    // bind this
    this.containerScrollHandler = this._onScroll.bind(this)

    // and call it at first
    this.containerScrollHandler()
  }

  /**
   * initialize
   *
   * @private
   */
  _init () {
    this.container.addEventListener('scroll', this.containerScrollHandler)
  }

  /**
   * unbind events
   *
   * @private
   */
  _unbindEvents () {
    this.container.removeEventListener('scroll', this.containerScrollHandler)
  }

  /**
   * scroll listener
   *
   * @private
   */
  _onScroll () {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this._loadImagesCore()
    }, this.option.delay)
  }

  /**
   * load image core implementation
   *
   * @private
   */
  _loadImagesCore () {
    const images = this.container.querySelectorAll('img')
    const containerScrollTop = this.container.nodeType === 9 ? document.documentElement.scrollTop : this.container.scrollTop
    const containerHeight = this.container.nodeType === 9 ? document.documentElement.clientHeight : this.container.offsetHeight

    // load condition
    // in some layout, if one image fits this condition, the following images fit, too.
    // this can be set a configuration.
    const hasNotLoadedImages = [ ...images ].filter((image) => {
      const loadedThisImage = image.dataset['__loaded']
      const hasSrc = image.dataset['src']

      // hasn't loaded & has src
      return !loadedThisImage && hasSrc
    })

    if (hasNotLoadedImages.length === 0) {
      this._unbindEvents()
      return
    }

    hasNotLoadedImages.filter((image) => {
      // and fit condition
      const viewTop = image.offsetTop - containerScrollTop
      return viewTop  < containerHeight + this.option.preloadHeight && viewTop > -image.offsetHeight
    })
      .forEach((image) => {
        const rawSrc = image.dataset['src']
        image.src = rawSrc
        image.dataset['__loaded'] = true
      })
  }

  /**
   * destroy
   *
   * @public
   */
  destroy () {
    clearTimeout(this.timer)
    this._unbindEvents()
    this.container = null
    this.option = null
    this.timer = null
  }
}

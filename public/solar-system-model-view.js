(() => {
  const targetClass = 'solar-system-model'
  const pitch = (35 * Math.PI) / 180

  function getModelPosition(object, model) {
    const position = { x: 0, y: 0, z: 0 }
    let current = object

    while (current && current !== model) {
      position.x += current.position?.x ?? 0
      position.y += current.position?.y ?? 0
      position.z += current.position?.z ?? 0
      current = current.parent
    }

    return position
  }

  function applyView(modelElement) {
    if (!modelElement.classList.contains(targetClass)) return true

    const state = modelElement.__modelState
    if (!state?.model || !state.pivotGroup || !state.modelSize) return false

    const sun = state.model.getObjectByName('Sun')
    if (!sun) return true

    const scale = Math.abs(state.pivotGroup.scale.x) || 1
    const sunPosition = getModelPosition(sun, state.model)
    const translation = {
      x: -scale * sunPosition.x,
      y: -scale * sunPosition.y,
      z: -scale * sunPosition.z,
    }
    state.entityTransform = new DOMMatrix()
      .translate(translation.x, translation.y, translation.z)
      .scale(scale, scale, scale)
    state.pivotGroup.rotation.set(0, 0, 0)
    state.pivotGroup.scale.setScalar(scale)
    state.pivotGroup.position.set(translation.x, translation.y, translation.z)
    state.boundingBoxCenter = new DOMPointReadOnly(sunPosition.x, sunPosition.y, sunPosition.z, 1)
    state.userSetEntityTransform = true

    if (state.camera) {
      const distance = state.camera.position.length()
      state.camera.position.set(0, distance * Math.sin(pitch), distance * Math.cos(pitch))
      state.camera.lookAt(0, 0, 0)
    }

    return true
  }

  function watchModel(modelElement) {
    if (modelElement.__solarSystemViewWatched) return
    modelElement.__solarSystemViewWatched = true
    modelElement.addEventListener('load', () => applyView(modelElement))
    modelElement.addEventListener('resize', () => applyView(modelElement))
    new ResizeObserver(() => applyView(modelElement)).observe(modelElement)
    applyView(modelElement)
  }

  document.querySelectorAll(`model.${targetClass}`).forEach(watchModel)
  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement && node.matches(`model.${targetClass}`)) watchModel(node)
        node.querySelectorAll?.(`model.${targetClass}`).forEach(watchModel)
      })
    })
  }).observe(document.documentElement, { childList: true, subtree: true })
})()

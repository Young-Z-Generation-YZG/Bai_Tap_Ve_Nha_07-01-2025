
/**
 * This code was generated by [react-native-codegen](https://www.npmjs.com/package/react-native-codegen).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 * @generated by codegen project: GenerateEventEmitterCpp.js
 */

#include <react/renderer/components/rnsvg/EventEmitters.h>


namespace facebook::react {















void RNSVGImageEventEmitter::onLoad(OnLoad $event) const {
  dispatchEvent("load", [$event=std::move($event)](jsi::Runtime &runtime) {
    auto $payload = jsi::Object(runtime);
    {
  auto source = jsi::Object(runtime);
  source.setProperty(runtime, "width", $event.source.width);
  source.setProperty(runtime, "height", $event.source.height);
  source.setProperty(runtime, "uri", $event.source.uri);
  $payload.setProperty(runtime, "source", source);
}
    return $payload;
  });
}















} // namespace facebook::react

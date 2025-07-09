import Foundation
import React

@objc(LiquidGlassViewManager)
class LiquidGlassViewManager: RCTViewManager {
  override func view() -> UIView! {
    return LiquidGlassView()
  }

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  // Export properties to React Native
  override func customDirectEventTypes() -> [String]! {
    return []
  }
  
  // Define the properties that can be set from React Native
  override func customBubblingEventTypes() -> [String]! {
    return []
  }
  
  // Export the view properties
  override func viewProps() -> [String]! {
    return [
      "intensity",
      "blurStyle", 
      "borderRadius",
      "borderWidth",
      "borderColor"
    ]
  }
}
package com.liquidglass

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.LiquidGlassViewManagerInterface
import com.facebook.react.viewmanagers.LiquidGlassViewManagerDelegate

@ReactModule(name = LiquidGlassViewManager.NAME)
class LiquidGlassViewManager : SimpleViewManager<LiquidGlassView>(),
  LiquidGlassViewManagerInterface<LiquidGlassView> {
  private val mDelegate: ViewManagerDelegate<LiquidGlassView>

  init {
    mDelegate = LiquidGlassViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<LiquidGlassView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): LiquidGlassView {
    return LiquidGlassView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: LiquidGlassView?, color: String?) {
    view?.setColor(color ?: "#00000000")
  }
  
  @ReactProp(name = "intensity")
  fun setIntensity(view: LiquidGlassView?, intensity: Float) {
    view?.setIntensity(intensity)
  }
  
  @ReactProp(name = "blurStyle")
  fun setBlurStyle(view: LiquidGlassView?, blurStyle: String?) {
    view?.setBlurStyle(blurStyle ?: "light")
  }
  
  @ReactProp(name = "borderRadius")
  fun setBorderRadius(view: LiquidGlassView?, borderRadius: Float) {
    view?.setBorderRadius(borderRadius)
  }
  
  @ReactProp(name = "borderWidth")
  fun setBorderWidth(view: LiquidGlassView?, borderWidth: Float) {
    view?.setBorderWidth(borderWidth)
  }
  
  @ReactProp(name = "borderColor")
  fun setBorderColor(view: LiquidGlassView?, borderColor: String?) {
    view?.setBorderColor(borderColor ?: "#00000000")
  }

  companion object {
    const val NAME = "LiquidGlassView"
  }
}

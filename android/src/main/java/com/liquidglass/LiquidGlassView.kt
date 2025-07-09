package com.liquidglass

import android.content.Context
import android.graphics.*
import android.graphics.drawable.GradientDrawable
import android.graphics.drawable.LayerDrawable
import android.util.AttributeSet
import android.view.View
import androidx.core.content.ContextCompat
import androidx.core.graphics.drawable.DrawableCompat

class LiquidGlassView : View {
  private var intensity: Float = 1.0f
  private var blurStyle: String = "light"
  private var borderRadius: Float = 0f
  private var borderWidth: Float = 0f
  private var borderColor: Int = Color.TRANSPARENT
  private var backgroundColor: Int = Color.TRANSPARENT
  
  private val paint = Paint(Paint.ANTI_ALIAS_FLAG)
  private val gradientPaint = Paint(Paint.ANTI_ALIAS_FLAG)
  private val borderPaint = Paint(Paint.ANTI_ALIAS_FLAG)
  
  constructor(context: Context?) : super(context) {
    init()
  }
  
  constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs) {
    init()
  }
  
  constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(
    context,
    attrs,
    defStyleAttr
  ) {
    init()
  }
  
  private fun init() {
    setLayerType(LAYER_TYPE_HARDWARE, null)
    updateBackground()
  }
  
  fun setIntensity(value: Float) {
    intensity = value.coerceIn(0f, 1f)
    updateBackground()
  }
  
  fun setBlurStyle(value: String) {
    blurStyle = value
    updateBackground()
  }
  
  fun setBorderRadius(value: Float) {
    borderRadius = value
    updateBackground()
  }
  
  fun setBorderWidth(value: Float) {
    borderWidth = value
    updateBackground()
  }
  
  fun setBorderColor(value: String) {
    borderColor = parseColor(value)
    updateBackground()
  }
  
  fun setColor(value: String) {
    backgroundColor = parseColor(value)
    updateBackground()
  }
  
  private fun parseColor(colorString: String): Int {
    return try {
      Color.parseColor(colorString)
    } catch (e: IllegalArgumentException) {
      Color.TRANSPARENT
    }
  }
  
  private fun updateBackground() {
    val drawable = createGlassEffectDrawable()
    background = drawable
    invalidate()
  }
  
  private fun createGlassEffectDrawable(): LayerDrawable {
    val layers = mutableListOf<Drawable>()
    
    // Base layer with background color and transparency
    val baseLayer = GradientDrawable().apply {
      shape = GradientDrawable.RECTANGLE
      cornerRadius = borderRadius
      setColor(backgroundColor)
      alpha = (255 * intensity).toInt()
    }
    layers.add(baseLayer)
    
    // Glass effect layer with gradient overlay
    val glassLayer = createGlassGradient()
    layers.add(glassLayer)
    
    // Border layer
    if (borderWidth > 0) {
      val borderLayer = createBorderDrawable()
      layers.add(borderLayer)
    }
    
    return LayerDrawable(layers.toTypedArray())
  }
  
  private fun createGlassGradient(): GradientDrawable {
    val colors = when (blurStyle) {
      "dark" -> intArrayOf(
        Color.argb((100 * intensity).toInt(), 0, 0, 0),
        Color.argb((50 * intensity).toInt(), 0, 0, 0),
        Color.argb((25 * intensity).toInt(), 0, 0, 0)
      )
      "systemUltraThinMaterial", "systemThinMaterial" -> intArrayOf(
        Color.argb((80 * intensity).toInt(), 255, 255, 255),
        Color.argb((40 * intensity).toInt(), 255, 255, 255),
        Color.argb((20 * intensity).toInt(), 255, 255, 255)
      )
      "systemMaterial", "systemThickMaterial" -> intArrayOf(
        Color.argb((120 * intensity).toInt(), 255, 255, 255),
        Color.argb((60 * intensity).toInt(), 255, 255, 255),
        Color.argb((30 * intensity).toInt(), 255, 255, 255)
      )
      else -> intArrayOf(
        Color.argb((100 * intensity).toInt(), 255, 255, 255),
        Color.argb((50 * intensity).toInt(), 255, 255, 255),
        Color.argb((25 * intensity).toInt(), 255, 255, 255)
      )
    }
    
    return GradientDrawable().apply {
      shape = GradientDrawable.RECTANGLE
      cornerRadius = borderRadius
      orientation = GradientDrawable.Orientation.TOP_BOTTOM
      colors = colors
      gradientType = GradientDrawable.LINEAR_GRADIENT
    }
  }
  
  private fun createBorderDrawable(): GradientDrawable {
    return GradientDrawable().apply {
      shape = GradientDrawable.RECTANGLE
      cornerRadius = borderRadius
      setStroke(borderWidth.toInt(), borderColor)
      setColor(Color.TRANSPARENT)
    }
  }
  
  override fun onDraw(canvas: Canvas) {
    super.onDraw(canvas)
    
    // Add subtle shadow for depth
    if (intensity > 0.3f) {
      paint.shadowRadius = 8f * intensity
      paint.shadowDx = 0f
      paint.shadowDy = 2f * intensity
      paint.shadowColor = Color.argb((50 * intensity).toInt(), 0, 0, 0)
      
      val rect = RectF(borderWidth, borderWidth, width - borderWidth, height - borderWidth)
      canvas.drawRoundRect(rect, borderRadius, borderRadius, paint)
    }
  }
}

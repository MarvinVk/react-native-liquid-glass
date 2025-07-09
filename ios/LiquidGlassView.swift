import Foundation
import UIKit

extension UIColor {
  convenience init?(hex: String) {
    let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
    var int: UInt64 = 0
    Scanner(string: hex).scanHexInt64(&int)
    let a, r, g, b: UInt64
    switch hex.count {
    case 3: // RGB (12-bit)
      (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
    case 6: // RGB (24-bit)
      (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
    case 8: // ARGB (32-bit)
      (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
    default:
      return nil
    }
    self.init(red: Double(r) / 255, green: Double(g) / 255, blue: Double(b) / 255, alpha: Double(a) / 255)
  }
}

@objc(LiquidGlassView)
class LiquidGlassView: UIView {
  
  private var blurView: UIVisualEffectView?
  private var containerView: UIView?
  private var intensity: CGFloat = 1.0
  private var blurStyle: String = "systemUltraThinMaterial"
  private var borderRadius: CGFloat = 0.0
  private var borderWidth: CGFloat = 0.0

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupGlass()
  }

  required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupGlass()
  }
  
  // Simple setter methods for React Native properties
  @objc func setIntensity(_ value: NSNumber) {
    intensity = CGFloat(truncating: value)
    print("LiquidGlass: Setting intensity to: \(intensity)")
    updateBlurEffect()
  }
  
  @objc func setBlurStyle(_ value: NSString) {
    blurStyle = value as String
    print("LiquidGlass: Setting blur style to: \(blurStyle)")
    updateBlurEffect()
  }
  
  @objc func setBorderRadius(_ value: NSNumber) {
    borderRadius = CGFloat(truncating: value)
    layer.cornerRadius = borderRadius
    layer.masksToBounds = borderRadius > 0
    clipsToBounds = borderRadius > 0
    
    // Also update the container view's corner radius
    containerView?.layer.cornerRadius = borderRadius
    containerView?.layer.masksToBounds = borderRadius > 0
  }
  
  @objc func setBorderWidth(_ value: NSNumber) {
    borderWidth = CGFloat(truncating: value)
    layer.borderWidth = borderWidth
  }
  
  @objc func setBorderColor(_ value: NSString) {
    layer.borderColor = UIColor(hex: value as String)?.cgColor
  }

  // Override backgroundColor to prevent React Native from trying to set it
  override var backgroundColor: UIColor? {
    get {
      return super.backgroundColor
    }
    set {
      // Ignore backgroundColor changes from React Native
      // We always want to keep it clear for the glass effect
      super.backgroundColor = .clear
    }
  }

  private func setupGlass() {
    backgroundColor = .clear
    clipsToBounds = true
    
    // Create a container view for proper clipping
    containerView = UIView()
    containerView?.backgroundColor = .clear
    containerView?.clipsToBounds = true
    
    if let containerView = containerView {
      addSubview(containerView)
      containerView.frame = bounds
      containerView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    }
    
    updateBlurEffect()
  }
  
  private func updateBlurEffect() {
    // Remove existing blur view
    blurView?.removeFromSuperview()
    
    if #available(iOS 16.0, *) {
      // For iOS 16+, use the new material styles which include Liquid Glass
      let effect: UIBlurEffect
      
      switch blurStyle {
      case "systemUltraThinMaterial":
        effect = UIBlurEffect(style: .systemUltraThinMaterial)
      case "systemThinMaterial":
        effect = UIBlurEffect(style: .systemThinMaterial)
      case "systemMaterial":
        effect = UIBlurEffect(style: .systemMaterial)
      case "systemThickMaterial":
        effect = UIBlurEffect(style: .systemThickMaterial)
      case "systemChromeMaterial":
        effect = UIBlurEffect(style: .systemChromeMaterial)
      case "dark":
        effect = UIBlurEffect(style: .dark)
      case "light":
        effect = UIBlurEffect(style: .light)
      default:
        effect = UIBlurEffect(style: .systemUltraThinMaterial)
      }
      
      blurView = UIVisualEffectView(effect: effect)
      blurView?.frame = containerView?.bounds ?? bounds
      blurView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
      
      // Apply the same corner radius to the container view and blur view
      containerView?.layer.cornerRadius = borderRadius
      containerView?.layer.masksToBounds = borderRadius > 0
      blurView?.layer.cornerRadius = borderRadius
      blurView?.layer.masksToBounds = borderRadius > 0
      
      if let blurView = blurView, let containerView = containerView {
        containerView.addSubview(blurView)
      }
      
      // Apply intensity by adjusting the blur effect's intensity
      // For system materials, we'll adjust the alpha slightly but keep it mostly visible
      let adjustedAlpha = max(0.3, min(1.0, intensity))
      blurView?.alpha = adjustedAlpha
      
      // Add different background colors for different material styles to make them more distinct
      var backgroundColor: UIColor
      switch blurStyle {
      case "systemUltraThinMaterial":
        backgroundColor = UIColor.systemBackground.withAlphaComponent(0.05)
      case "systemThinMaterial":
        backgroundColor = UIColor.systemBackground.withAlphaComponent(0.1)
      case "systemMaterial":
        backgroundColor = UIColor.systemBackground.withAlphaComponent(0.15)
      case "systemThickMaterial":
        backgroundColor = UIColor.systemBackground.withAlphaComponent(0.2)
      case "systemChromeMaterial":
        backgroundColor = UIColor.systemChromeMaterial.withAlphaComponent(0.1)
      default:
        backgroundColor = UIColor.systemBackground.withAlphaComponent(0.1)
      }
      blurView?.backgroundColor = backgroundColor
      
      // Ensure the blur view itself is clipped to the corner radius
      blurView?.clipsToBounds = true
      
    } else {
      // Fallback for older iOS versions
      let effect: UIBlurEffect
      
      switch blurStyle {
      case "dark":
        effect = UIBlurEffect(style: .dark)
      case "light":
        effect = UIBlurEffect(style: .light)
      default:
        effect = UIBlurEffect(style: .light)
      }
      
      blurView = UIVisualEffectView(effect: effect)
      blurView?.frame = containerView?.bounds ?? bounds
      blurView?.autoresizingMask = [.flexibleWidth, .flexibleHeight]
      
      // Apply the same corner radius to the container view and blur view
      containerView?.layer.cornerRadius = borderRadius
      containerView?.layer.masksToBounds = borderRadius > 0
      blurView?.layer.cornerRadius = borderRadius
      blurView?.layer.masksToBounds = borderRadius > 0
      
      if let blurView = blurView, let containerView = containerView {
        containerView.addSubview(blurView)
      }
      
      // Apply intensity by adjusting alpha
      blurView?.alpha = intensity
    }
  }
}


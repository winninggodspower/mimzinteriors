import { forwardRef } from "react"

const FormInput = forwardRef(
  ({ 
    label, name, type = "text", required = false, placeholder, className = "",
     suffix,  error, icon, inputClassName = "", ...props }, ref) => {
    return (
      <div className={className}>
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          {icon} {/* Render the icon if provided */}
          <input
            ref={ref}
            type={type}
            id={name}
            name={name}
            className={`w-full px-4 py-3 border ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                : "border-slate-200 focus:border-[#B58A2A] focus:ring-[#B58A2A]/20"
            } rounded-xl bg-white text-slate-800 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 transition-all duration-150 ${inputClassName}`}
            placeholder={placeholder}
            required={required}
            {...props}
          />
          {suffix && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 flex items-center">{suffix}</span>}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    )
  },
)

FormInput.displayName = "FormInput"

export default FormInput
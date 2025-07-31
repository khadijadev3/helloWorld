import { useState } from "react"
import { Dialog } from "primereact/dialog"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { InputTextarea } from "primereact/inputtextarea"
import { Button } from "primereact/button"
import { InputNumber } from "primereact/inputnumber"
import { AgreementValidation } from "./AgreementValidation"

const AddAgreementForm = ({ visible, onHide, onSubmit }) => {
  const [formData, setFormData] = useState({
    vendorParty: "",
    department: "",
    agreementDate: null,
    renewalDate: null,
    expiryDate: null,
    term: "",
    nature: "",
    agreementType: "",
    cost: null,
    terminationCause: "",
    terminationBy: "",
    contactPerson: "",
    contactEmail: "",
    comments: "",
  })

  const [errors, setErrors] = useState({})

  // Dropdown options
const vendorOptions = [
  { label: "Abdul Hakeem", value: "Abdul Hakeem" },
  { label: "Abottabad KPK", value: "Abottabad KPK" },
  { label: "Ahmed pur east road uch Sharif", value: "Ahmed pur east road uch Sharif" },
  { label: "Ahmed pur east bhawalpur", value: "Ahmed pur east bhawalpur" },
  { label: "Ali pur (punjab)", value: "Ali pur (punjab)" },
  { label: "Amindabad", value: "Amindabad" },
  { label: "Arifwala", value: "Arifwala" },
  { label: "Astore", value: "Astore" },
  { label: "Attock", value: "Attock" },
  { label: "Badin", value: "Badin" },
  { label: "Baghbanpura", value: "Baghbanpura" },
  { label: "Baldia", value: "Baldia" },
  { label: "Bang Yarqoon", value: "Bang Yarqoon" },
  { label: "Batapur Lahore", value: "Batapur Lahore" },
  { label: "Batapur", value: "Batapur" },
  { label: "Bhakar", value: "Bhakar" },
  { label: "Bhalwal (punjab)", value: "Bhalwal (punjab)" },
  { label: "Bhawal Nagar (2)", value: "Bhawal Nagar (2)" },
  { label: "Bhawal Nagar (punjab)", value: "Bhawal Nagar (punjab)" },
  { label: "Bhawalpur Yazman", value: "Bhawalpur Yazman" },
  { label: "Bhawalpur.pdf 01", value: "Bhawalpur.pdf 01" },
  { label: "Bisham", value: "Bisham" },
  { label: "Bund road", value: "Bund road" },
  { label: "Burewala", value: "Burewala" }
];

const departmentOptions = [
  { label: "Business", value: "Business" },
  { label: "Banking Operations Information Technology", value: "Banking Operations Information Technology" },
  { label: "Internal Audit", value: "Internal Audit" },
  { label: "Risk Management", value: "Risk Management" },
  { label: "Administration", value: "Administration" },
  { label: "Human Resources", value: "Human Resources" },
  { label: "Finance", value: "Finance" },
  { label: "Treasury", value: "Treasury" },
  { label: "Digital & Financial Inclusion", value: "Digital & Financial Inclusion" },
  { label: "Compliance", value: "Compliance" },
  { label: "President office", value: "President office" },
  { label: "Communications & Brand Mgt", value: "Communications & Brand Mgt" },
  { label: "Legal", value: "Legal" },
  { label: "IT", value: "IT" }
];

const termOptions = [
  { label: "Unspecified", value: "Unspecified" },
  { label: "12 Months", value: "12 Months" },
  { label: "1 Year Initial", value: "1 Year Initial" },
  { label: "1 Year", value: "1 Year" },
  { label: "2 Year", value: "2 Year" },
  { label: "3 Year", value: "3 Year" },
  { label: "4 Year", value: "4 Year" },
  { label: "5 Year", value: "5 Year" },
  { label: "6 Year", value: "6 Year" },
  { label: "7 Year", value: "7 Year" },
  { label: "8 Year", value: "8 Year" },
  { label: "9 Year", value: "9 Year" },
  { label: "10 Year", value: "10 Year" }
];

  const agreementTypeOptions = [
    { label: "Select one", value: "" },
    { label: "SLA", value: "SLA" },
    { label: "Legal Agreement", value: "Legal Agreement" },
  ]

  const terminationByOptions = [
    { label: "Select One", value: "" },
    { label: "Vendor", value: "Vendor" },
    { label: "FMFB", value: "FMFB" },
    { label: "Either", value: "Either" },
  ]

  // --- FIX: Normalize date inputs so validation sees a real Date or null ---
  const dateFields = new Set(["agreementDate", "renewalDate", "expiryDate"])
  const coerceToDate = (val) => {
    if (!val) return null
    if (val instanceof Date) return isNaN(val.getTime()) ? null : val
    if (typeof val === "string") {
      // Try dd/mm/yy or dd/mm/yyyy
      const m = val.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2}|\d{4})$/)
      if (m) {
        const d = parseInt(m[1], 10)
        const mo = parseInt(m[2], 10) - 1
        let y = parseInt(m[3], 10)
        if (y < 100) y += 2000
        const dt = new Date(y, mo, d)
        return isNaN(dt.getTime()) ? null : dt
      }
      const dt = new Date(val)
      return isNaN(dt.getTime()) ? null : dt
    }
    return null
  }

  const handleInputChange = (field, value) => {
    const normalized =
      dateFields.has(field) ? coerceToDate(value) : value

    setFormData((prev) => ({
      ...prev,
      [field]: normalized,
    }))

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }
  // --- END FIX ---

const handleSubmit = (e) => {
  e.preventDefault()
  const { haserror, errors: validationErrors } = AgreementValidation(formData)
  setErrors(validationErrors || {})
  if (haserror) {
    console.log("Validation errors:", validationErrors)
    return
  }
  
  const agreementData = {
    partyId: {
      partyName: formData.vendorParty
    },
    departmentId: {
      departmentName: formData.department
    },
    agreementDate: formData.agreementDate ? formData.agreementDate.toISOString().split("T")[0] : null,
    renewalDate: formData.renewalDate ? formData.renewalDate.toISOString().split("T")[0] : null,
    expiryDate: formData.expiryDate ? formData.expiryDate.toISOString().split("T")[0] : null,
    contactPerson: formData.contactPerson,
    contactEmail: formData.contactEmail,
    term: formData.term,
    nature: formData.nature,
    agreementType: formData.agreementType,
    cost: formData.cost,
    terminationCause: formData.terminationCause,
    terminationBy: formData.terminationBy,
    comments: formData.comments,
    closeAgreement: false,
    closedDate: null
  }
  
  console.log("Submitting agreementData:", agreementData)
  
  // Call the onSubmit callback
  if (onSubmit) {
    onSubmit(agreementData)
  }
  
  // Reset form after successful submission
  setFormData({
    vendorParty: "",
    department: "",
    agreementDate: null,
    renewalDate: null,
    expiryDate: null,
    term: "",
    nature: "",
    agreementType: "",
    cost: null,
    terminationCause: "",
    terminationBy: "",
    contactPerson: "",
    contactEmail: "",
    comments: "",
  })
  setErrors({})
  onHide()
}

  const handleCancel = () => {
    setFormData({
      vendorParty: "",
      department: "",
      agreementDate: null,
      renewalDate: null,
      expiryDate: null,
      term: "",
      nature: "",
      agreementType: "",
      cost: null,
      terminationCause: "",
      terminationBy: "",
      contactPerson: "",
      contactEmail: "",
      comments: "",
    })
    setErrors({})
    onHide()
  }

  const dialogHeader = (
    <div className="flex items-center gap-3">
      <i className="pi pi-file-plus heading-icon text-xl"></i>
      <span className="text-xl font-semibold heading-black">Add New Agreement</span>
    </div>
  )

  return (
    <Dialog
      header={dialogHeader}
      visible={visible}
      onHide={handleCancel}
      style={{ width: "90vw", maxWidth: "1000px" }}
      className="p-fluid custom-dialog"
      modal
      closable
      draggable={false}
      resizable={false}
    >
      <div className="info-banner mb-4">
        <p className="text-sm font-medium">
          All Agreements with Third Party to be entered Here All Fields are mandatory
        </p>
      </div>
      <form onSubmit={handleSubmit} className="form-container">
        {/* Validation States label, black and bold */}
        <div className="field-container">
          <label style={{ color: "#000", fontWeight: "bold", fontSize: "1.25rem" }}>Validation States</label>
        </div>
        {/* First Row */}
        <div className="form-row">
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-building mr-2" style={{ color: "#2c3644" }}></i>
              Select Vendor/Party *
            </label>
            <Dropdown
              value={formData.vendorParty}
              options={vendorOptions}
              onChange={(e) => handleInputChange("vendorParty", e.value)}
              placeholder="Select One"
              className={`custom-dropdown ${errors.vendorParty ? "p-invalid" : ""}`}
            />
            {errors.vendorParty && <small className="error-text">{errors.vendorParty}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-sitemap mr-2" style={{ color: "#2c3644" }}></i>
              Select Department *
            </label>
            <Dropdown
              value={formData.department}
              options={departmentOptions}
              onChange={(e) => handleInputChange("department", e.value)}
              placeholder="Select One"
              className={`custom-dropdown ${errors.department ? "p-invalid" : ""}`}
            />
            {errors.department && <small className="error-text">{errors.department}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-calendar mr-2" style={{ color: "#2c3644" }}></i>
              Agreement Date *
            </label>
            <Calendar
              value={formData.agreementDate}
              onChange={(e) => handleInputChange("agreementDate", e.value)}
              placeholder="Agreement Date"
              showIcon
              className={`custom-calendar ${errors.agreementDate ? "p-invalid" : ""}`}
              dateFormat="dd/mm/yy"
              icon="pi pi-calendar"
            />
            {errors.agreementDate && <small className="error-text">{errors.agreementDate}</small>}
          </div>
        </div>
        {/* Second Row */}
        <div className="form-row">
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-calendar mr-2" style={{ color: "#2c3644" }}></i>
              Renewal Date *
            </label>
            <Calendar
              value={formData.renewalDate}
              onChange={(e) => handleInputChange("renewalDate", e.value)}
              placeholder="Renewal Date"
              showIcon
              className={`custom-calendar ${errors.renewalDate ? "p-invalid" : ""}`}
              dateFormat="dd/mm/yy"
              icon="pi pi-calendar"
            />
            {errors.renewalDate && <small className="error-text">{errors.renewalDate}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-calendar mr-2" style={{ color: "#2c3644" }}></i>
              Expiry Date *
            </label>
            <Calendar
              value={formData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.value)}
              placeholder="Expiry Date"
              showIcon
              className={`custom-calendar ${errors.expiryDate ? "p-invalid" : ""}`}
              dateFormat="dd/mm/yy"
              icon="pi pi-calendar"
            />
            {errors.expiryDate && <small className="error-text">{errors.expiryDate}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-clock mr-2" style={{ color: "#2c3644" }}></i>
              Select Term *
            </label>
            <Dropdown
              value={formData.term}
              options={termOptions}
              onChange={(e) => handleInputChange("term", e.value)}
              placeholder="Select One"
              className={`custom-dropdown ${errors.term ? "p-invalid" : ""}`}
            />
            {errors.term && <small className="error-text">{errors.term}</small>}
          </div>
        </div>
        {/* Third Row */}
        <div className="form-row-2">
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-info-circle mr-2" style={{ color: "#2c3644" }}></i>
              Nature *
            </label>
            <InputText
              value={formData.nature}
              onChange={(e) => handleInputChange("nature", e.target.value)}
              placeholder="Nature"
              className={`custom-input ${errors.nature ? "p-invalid" : ""}`}
            />
            {errors.nature && <small className="error-text">{errors.nature}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-cog mr-2" style={{ color: "#2c3644" }}></i>
              Agreement Type *
            </label>
            <Dropdown
              value={formData.agreementType}
              options={agreementTypeOptions}
              onChange={(e) => handleInputChange("agreementType", e.value)}
              placeholder="Select one"
              className={`custom-dropdown ${errors.agreementType ? "p-invalid" : ""}`}
            />
            {errors.agreementType && <small className="error-text">{errors.agreementType}</small>}
          </div>
        </div>
        {/* Fourth Row */}
        <div className="form-row-2">
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-money-bill mr-2" style={{ color: "#2c3644" }}></i>
              Cost *
            </label>
            <InputNumber
              value={formData.cost}
              onValueChange={(e) => handleInputChange("cost", e.value)}
              placeholder="Cost"
              className={`custom-input-number ${errors.cost ? "p-invalid" : ""}`}
            />
            {errors.cost && <small className="error-text">{errors.cost}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-exclamation-triangle mr-2" style={{ color: "#2c3644" }}></i>
              Termination Cause *
            </label>
            <InputText
              value={formData.terminationCause}
              onChange={(e) => handleInputChange("terminationCause", e.target.value)}
              placeholder="Termination Cause"
              className={`custom-input ${errors.terminationCause ? "p-invalid" : ""}`}
            />
            {errors.terminationCause && <small className="error-text">{errors.terminationCause}</small>}
          </div>
        </div>
        {/* Fifth Row */}
        <div className="form-row">
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-cog mr-2" style={{ color: "#2c3644" }}></i>
              Termination By *
            </label>
            <Dropdown
              value={formData.terminationBy}
              options={terminationByOptions}
              onChange={(e) => handleInputChange("terminationBy", e.value)}
              placeholder="Select One"
              className={`custom-dropdown ${errors.terminationBy ? "p-invalid" : ""}`}
            />
            {errors.terminationBy && <small className="error-text">{errors.terminationBy}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-user mr-2" style={{ color: "#2c3644" }}></i>
              Contact Person / counter Party *
            </label>
            <InputText
              value={formData.contactPerson}
              onChange={(e) => handleInputChange("contactPerson", e.target.value)}
              placeholder="Contact Person"
              className={`custom-input ${errors.contactPerson ? "p-invalid" : ""}`}
            />
            {errors.contactPerson && <small className="error-text">{errors.contactPerson}</small>}
          </div>
          <div className="field-container">
            <label className="field-label">
              <i className="pi pi-envelope mr-2" style={{ color: "#2c3644" }}></i>
              Contact Person Email *
            </label>
            <InputText
              value={formData.contactEmail}
              onChange={(e) => handleInputChange("contactEmail", e.target.value)}
              placeholder="Email"
              type="email"
              className={`custom-input ${errors.contactEmail ? "p-invalid" : ""}`}
            />
            {errors.contactEmail && <small className="error-text">{errors.contactEmail}</small>}
          </div>
        </div>
        {/* Comments */}
        <div className="field-container">
          <label className="field-label">
            <i className="pi pi-comment mr-2" style={{ color: "#2c3644" }}></i>
            Comments
          </label>
          <InputTextarea
            value={formData.comments}
            onChange={(e) => handleInputChange("comments", e.target.value)}
            placeholder="Enter comments..."
            rows={3}
            autoResize
            className="custom-textarea"
          />
        </div>
        {/* Form Actions */}
        <div className="form-actions">
          <Button
            type="submit"
            label="Submit"
            className="app-btn app-btn--primary single-btn"
          />
        </div>
      </form>
      <style jsx>{`
  /* Scrollbar Styling */
  :global(.custom-dialog .p-dialog-content)::-webkit-scrollbar {
    width: 10px;
    background: #f0f9ff;
  }
  :global(.custom-dialog .p-dialog-content)::-webkit-scrollbar-thumb {
    background: #2c3644;
    border-radius: 8px;
  }
  :global(.custom-dialog .p-dialog-content) {
    scrollbar-color: #2c3644 #f0f9ff;
    scrollbar-width: thin;
    background-color: white;
    padding: 1.5rem;
  }

  /* Dialog Header */
  :global(.custom-dialog .p-dialog-header) {
    background-color: white;
    border-bottom: 2px solid #2c3644;
    padding: 1.5rem;
  }
  :global(.custom-dialog .p-dialog-header .p-dialog-header-icon),
  :global(.custom-dialog .p-dialog-header .p-dialog-header-icon:focus),
  :global(.custom-dialog .p-dialog-header .p-dialog-header-icon:active),
  :global(.custom-dialog .p-dialog-header .p-dialog-header-icon:hover) {
    border: none !important;
    box-shadow: none !important;
    background: none !important;
    outline: none !important;
  }

  /* PrimeReact Icons */
  :global(.custom-dialog .pi) {
    color: #2c3644 !important;
  }
    .p-invalid {
  border: 1px solid #dc2626 !important;
  box-shadow: 0 0 0 0.2rem rgba(220, 38, 38, 0.25);
}

  /* Buttons */
  .p-button {
    background-color: #02a897 !important;
    border: 1px solid #02a897 !important;
  }

  .app-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.85rem;
    line-height: 1;
    border-radius: 8px;
    border: 1px solid transparent;
    font-weight: 600;
    letter-spacing: 0.2px;
    transition: background-color 0.2s ease, color 0.2s ease,
      border-color 0.2s ease, box-shadow 0.2s ease, transform 0.02s ease;
  }
  .app-btn--primary {
    background: #02a897;
    color: #ffffff;
    border-color: #02a897;
  }
  .app-btn--primary:hover {
    background: #029688 !important;
  }
  .app-btn--outline {
    background: transparent;
    color: #02a897;
    border-color: #02a897;
  }
  .app-btn--outline:hover {
    background: rgba(2, 168, 151, 0.08);
  }
  .app-btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(2, 168, 151, 0.28);
  }
  .app-btn:active {
    transform: translateY(1px);
  }

  /* Form Layout */
  .info-banner {
    padding: 1rem;
    background-color: #f0f9ff;
    border-left: 4px solid #2c3644;
    border-radius: 0.375rem;
    margin-bottom: 1.5rem;
  }
  .info-banner p {
    color: #2c3644;
    margin: 0;
  }
  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .form-row,
  .form-row-2 {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .form-row {
      grid-template-columns: repeat(3, 1fr);
    }
    .form-row-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .field-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .field-label {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: #2c3644;
    margin-bottom: 0.5rem;
  }
  .error-text {
    color: #dc2626;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }
  .form-actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.6rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e5e7eb;
    margin-top: 1rem;
  }
  .single-btn {
    min-width: 120px;
    max-width: 160px;
    width: 160px;
    height: 40px;
    font-size: 1rem;
    font-weight: 600;
    justify-content: flex-start;
  }
  .app-btn--primary .pi {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    .form-actions {
      flex-direction: row;
    }
    .single-btn {
      width: 100%;
      min-width: 100px;
      height: 36px;
      font-size: 0.95rem;
    }
    :global(.custom-dialog) {
      margin: 1rem;
    }
  }

  /* InputText and Dropdown Styling (Dark Blue Focus/Hover) */
  .p-inputtext {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem 0.875rem;
    line-height: 1.25rem;
    min-height: 44px;
    font-size: 0.95rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
`}</style>

    </Dialog>
  )
}

export default AddAgreementForm
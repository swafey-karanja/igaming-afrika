import { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Breadcrumb from '../components/BreadCrumb'
import { useTranslation } from 'react-i18next'

export default function Registration() {

    const { t } = useTranslation();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        country: 'United States',
        streetAddress: '',
        city: '',
        region: '',
        postalCode: '',
        comments: true,
        candidates: false,
        offers: false,
        pushNotifications: 'everything'
    });

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }))
    }

    const validateForm = () => {
        const newErrors = {}
        if(!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if(!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid'
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validateForm()) {
            return
        }

        setIsSubmitting(true);

        try {
            console.log("submitted form", formData)
            setIsSubmitting(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-full bg-gray-100'>
          <Header />
          <Hero />
          <div className='py-16 w-full bg-gray-100 max-w-6xl mx-auto'>
            <Breadcrumb />
            <form onSubmit={handleSubmit} className='max-w-6xl mx-auto px-6'>
              {/* Personal Information Section */}
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">{t('personal_information')}</h2>
                  <p className="mt-1 text-sm/6 text-gray-600">{t('permanent_address_note')}</p>
    
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* First Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                        {t('first_name')}
                      </label>
                      <div className="mt-2">
                        <input
                          id="first-name"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1
                             -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 
                             focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 
                             ${errors.firstName ? 'border-red-500' : ''}`
                            }
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>
                    </div>
    
                    {/* Last Name */}
                    <div className="sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                        {t('last_name')}
                      </label>
                      <div className="mt-2">
                        <input
                          id="last-name"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                            outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                            sm:text-sm/6 ${errors.lastName ? 'border-red-500' : ''}`
                            }
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
                      </div>
                    </div>
    
                    {/* Email */}
                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                        {t('email_address')}
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1
                            outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
                            sm:text-sm/6 ${errors.email ? 'border-red-500' : ''}`
                            }
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>
                    </div>
    
                    {/* Country */}
                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                        {t('country')}
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          value={formData.country}
                          onChange={handleChange}
                          className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 
                            outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                        />
                      </div>
                    </div>
    
                    {/* Street Address */}
                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                      {t("street_address")}
                      </label>
                      <div className="mt-2">
                        <input
                          id="street-address"
                          name="streetAddress"
                          type="text"
                          autoComplete="street-address"
                          value={formData.streetAddress}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300
                             placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}
                        />
                      </div>
                    </div>
    
                    {/* City */}
                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                        {t('city')}
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          value={formData.city}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300
                             placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        />
                      </div>
                    </div>
    
                    {/* State/Province */}
                    <div className="sm:col-span-2">
                      <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                        {t("state_province")}
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          name="region"
                          type="text"
                          autoComplete="address-level1"
                          value={formData.region}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300
                           placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
    
                    {/* ZIP/Postal Code */}
                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                        {t('zip_postal_code')}
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          name="postalCode"
                          type="text"
                          autoComplete="postal-code"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300
                             placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
    
                {/* Notifications Section */}
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">{t("notifications")}</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">
                        {t('general_notifications_note')}
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm/6 font-semibold text-gray-900">{t('by_email')}</legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex gap-3">
                                    <div className="flex h-6 shrink-0 items-center">
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                id="candidates"
                                                name="candidates"
                                                type="checkbox"
                                                aria-describedby="candidates-description"
                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 14 14"
                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                            >
                                                <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-checked:opacity-100"
                                                />
                                                <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-indeterminate:opacity-100"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="text-sm/6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                        {t("event")}
                                        </label>
                                        <p id="candidates-description" className="text-gray-500">
                                        {t('news_description')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            aria-describedby="offers-description"
                                            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                        >
                                            <path
                                            d="M3 8L6 11L11 3.5"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-checked:opacity-100"
                                            />
                                            <path
                                            d="M3 7H11"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="opacity-0 group-has-indeterminate:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-sm/6">
                                    <label htmlFor="offers" className="font-medium text-gray-900">
                                    {t('news')}
                                    </label>
                                    <p id="offers-description" className="text-gray-500">
                                    {t('push_description')}
                                    </p>
                                </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                        <legend className="text-sm/6 font-semibold text-gray-900">{t('push_notifications')}</legend>
                        <p className="mt-1 text-sm/6 text-gray-600">{t('sms_delivery_note')}</p>
                        <div className="mt-6 space-y-6">
                            <div className="flex items-center gap-x-3">
                            <input
                                defaultChecked
                                id="push-everything"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <label htmlFor="push-everything" className="block text-sm/6 font-medium text-gray-900">
                                {t('everything')}
                            </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                            <input
                                id="push-email"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <label htmlFor="push-email" className="block text-sm/6 font-medium text-gray-900">
                                {t('same_as_email')}
                            </label>
                            </div>
                            <div className="flex items-center gap-x-3">
                            <input
                                id="push-nothing"
                                name="push-notifications"
                                type="radio"
                                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                            />
                            <label htmlFor="push-nothing" className="block text-sm/6 font-medium text-gray-900">
                                {t('no_push_notifications')}
                            </label>
                            </div>
                        </div>
                        </fieldset>
                    </div>
                </div>
    
              </div>
    
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-gray-900 cursor-pointer">
                  {t('cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-md cursor-pointer bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 
                    focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? t('submitting') : t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )
}
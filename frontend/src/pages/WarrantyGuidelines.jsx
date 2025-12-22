import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

const WarrantyGuidelines = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-red-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Warranty Guidelines
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-black">
          {/* Warranty Overview */}
          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Warranty Claim Guidelines
              </h2>
            </div>
            <p className="text-black leading-relaxed mb-4">
              All the products sold by GEARMATES are covered by 1 year
              manufacturing warranty.
            </p>
            <p className="text-black leading-relaxed">
              If you face any issues with your GEARMATES product, please contact
              us by reaching out to our HelpCenter:{" "}
              <a
                href="mailto:gearmates.info@gmail.com"
                className="text-red-600 hover:underline"
              >
                gearmates.info@gmail.com
              </a>{" "}
              and we will be delighted to help you.
            </p>
          </section>

          {/* Warranty Guidelines Details */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Warranty Guidelines
            </h2>
            <ul className="space-y-3 text-black">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The warranty services is limited to repair or replacement of
                  the product & is at the sole discretion of GEARMATES.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Proof of purchase is required to be presented for availing
                  warranty services.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The item should be kept in its original condition, with brand
                  outer box, MRP tags attached, warranty cards, and original
                  accessories in manufacturer packaging for a successful return.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Our customer service team will contact you and attempt to
                  troubleshoot the issue.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  If the issue is not resolved over call or email, we will
                  arrange to pick up the device from your address, for repair or
                  replacement.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  In case of non-availability of reverse-pickup facility at your
                  location, we will request you to self-ship the product to our
                  warehouse and share the tracking details with the customer
                  service team. GEARMATES will not be responsible for any loss
                  or damage during transit if you self-ship your product to us.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  GEARMATES warranty coverage shall be limited only to provide
                  repairs & rectification of the fault reported. In case a
                  replacement is provided, it will be done with an equivalent
                  condition device only, with or without packaging &
                  accessories.
                </span>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  GEARMATES shall not cover any consequential or resulting
                  liability, damage or loss to property or life, injuries, loss
                  of any kind of personal data arising directly or indirectly
                  out of any defects in GEARMATES products.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  While we will make every effort to carry out repair at the
                  earliest, we would like to make it expressly clear that we are
                  under no obligation to do so in a specified period of time.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  If any coloured internal or external components are to be
                  replaced, there will be an effort to ensure that the shades
                  match with the original or other components. The replaced
                  shades, patterns, tints may vary from the customer's unit due
                  to continuous usage of the unit. Any matching components
                  changed at customer's request will be on a chargeable basis
                  except the component replaced under warranty.
                </span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  In case of product replacement within the warranty period, if
                  the product is out of stock, an upgraded model of the
                  equivalent price will be offered.
                </span>
              </li>
            </ul>
          </section>

          {/* Warranty Not Applicable */}
          <section>
            <div className="flex items-center mb-4">
              <XCircle className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Warranty is Not Applicable in the Following Cases
              </h2>
            </div>
            <ul className="space-y-3 text-black">
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The product is not operated according to the instructions
                  given in the instruction manual.
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  In case of any damage to the product, customer abuse, repair
                  by unauthorised persons, misuse detected, product attacked or
                  damaged by house pests, pets, rodents, accidental or
                  incidental damage, spillage of any kind of liquid on the
                  device, device subjected to extreme temperatures, atmospheric
                  conditions, water logging in the product, non-specified
                  charger usage, any kind of breaking or cutting of wires,
                  improper or reckless use, defects developed by due to causes
                  beyond control like lightning, abnormal voltage or acts of
                  God.
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  The warranty will automatically terminate on the expiry of the
                  warranty period of 12 Months (as determined by proof of
                  purchase), even if the product is not in use during the
                  warranty period for any reason.
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Deterioration or peeling of the colour of the product due to
                  normal wear & tear or usage.
                </span>
              </li>
              <li className="flex items-start">
                <XCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Issues pertaining to look & feel of the product, dim display
                  under sunlight, low sound quality due to accumulation of dust
                  or dirt.
                </span>
              </li>
            </ul>
          </section>

          {/* Warranty Claim Procedure */}
          <section>
            <div className="flex items-center mb-4">
              <ClipboardList className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Warranty Claim Procedure
              </h2>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </span>
                  Submit Warranty Claim Form
                </h3>
                <p className="text-black text-sm ml-11">
                  Warranty claim procedure starts with customers submitting the
                  Warranty Claim form on GEARMATES help center (
                  <a
                    href="mailto:gearmates.info@gmail.com"
                    className="text-red-600 hover:underline"
                  >
                    gearmates.info@gmail.com
                  </a>
                  ). Once a form is submitted a ticket is generated for the
                  customer service team to work on.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </span>
                  Review & Pickup Arrangement
                </h3>
                <p className="text-black text-sm ml-11">
                  The customer service team will review the information provided
                  by the customer and arrange for a reverse pickup if the
                  product qualifies for warranty within 24-48 hours of ticket
                  being raised.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </span>
                  Product Pickup
                </h3>
                <p className="text-black text-sm ml-11">
                  Once a pickup is arranged, the product gets picked up from the
                  customer within 24-48 hours.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </span>
                  Warehouse Delivery
                </h3>
                <p className="text-black text-sm ml-11">
                  The product gets delivered to our warehouse within 3-5
                  business days. Customers can track the delivery of their
                  product on the courier website. Once the product reaches our
                  warehouse, an email notification confirming the same will be
                  sent to the customer.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    5
                  </span>
                  Testing Team Review
                </h3>
                <p className="text-black text-sm ml-11">
                  Once we receive the product, it will be moved to the testing
                  team for repair within 24 hours. Customers will receive an
                  email notification when their product moves to this stage.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    6
                  </span>
                  Repair & Testing
                </h3>
                <p className="text-black text-sm ml-11">
                  The testing team identifies the cause of the defect/issue with
                  the product and based on their finding approves the product
                  for the warranty claim by repairing/replacing the product
                  based on the manufacturing guidelines. This process generally
                  takes 5-7 business days as it involves identification and
                  fixing the issue along with testing the reworked product
                  before dispatching to the customer. Customer will be sent an
                  email notification once the issue is resolved and testing of
                  the product is completed.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    7
                  </span>
                  Product Dispatch
                </h3>
                <p className="text-black text-sm ml-11">
                  Within 24 hours of repair and testing is completed, the
                  product gets packed and is shipped back to the customers. An
                  email notification is sent to the customer with the tracking
                  details and the customer can track the delivery on the courier
                  website.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-2 flex items-center">
                  <span className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                    8
                  </span>
                  Claim Closure
                </h3>
                <p className="text-black text-sm ml-11">
                  Once the package is delivered to the customer, the warranty
                  claim process is closed by sending a confirmation email of the
                  same.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <h2 className="text-2xl font-semibold text-black mb-4">
              Quick Reference
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  Warranty Period
                </h3>
                <p className="text-black text-sm">
                  12 Months from date of purchase
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">Response Time</h3>
                <p className="text-black text-sm">24-48 hours after claim</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  Repair Duration
                </h3>
                <p className="text-black text-sm">5-7 business days</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">Pickup Time</h3>
                <p className="text-black text-sm">24-48 hours after approval</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-900 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Need Warranty Support?
            </h2>
            <p className="mb-4">
              For warranty claims or any product-related issues, please contact
              us:
            </p>
            <div className="space-y-2">
              <p>
                Email:{" "}
                <a
                  href="mailto:gearmates.info@gmail.com"
                  className="text-red-400 hover:underline"
                >
                  gearmates.info@gmail.com
                </a>
              </p>
              <p>Phone: +91 92051 63669, +91 70538 09341</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WarrantyGuidelines;

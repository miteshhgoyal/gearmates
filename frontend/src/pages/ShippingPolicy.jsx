import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const ShippingPolicy = () => {
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
            Shipping Policy
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8 text-black">
          {/* Shipping Information */}
          <section>
            <div className="flex items-center mb-4">
              <Truck className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Shipping Information
              </h2>
            </div>
            <p className="text-black leading-relaxed mb-4">
              We are providing free shipping for all prepaid orders deliverable
              to any location in the country. The time of delivery may vary from
              place to place once the products are dispatched from our
              warehouse, but generally it varies from 4 - 6 days. The user must
              agree to provide authentic and true information, to avoid any kind
              of delay or loss of the product.
            </p>
            <p className="text-black leading-relaxed mb-4">
              GEARMATES reserves the right to confirm and validate the
              information and other details provided by the user at any point of
              time. If upon confirmation, such user details are found not true
              (wholly or partly), GEARMATES has the right in its sole discretion
              to reject the registration and debar the user from using the
              services available at this website, and / or other affiliated
              websites without prior intimation whatsoever. In the event that a
              non-delivery occurs on account of a mistake by you (i.e. wrong
              name, address or contact number) any extra cost towards
              re-delivery shall be claimed by the user placing the order.
            </p>
            <p className="text-black leading-relaxed mb-4">
              For Deliveries within India all taxes and duties are included in
              the price of the product listed on the Website. We would send you
              a tracking number and link to our courier company with your
              shipping confirmation email so you can track your order. At times
              orders can get delayed for reasons outside of our control.
              GEARMATES shall not be liable for any delay / non-delivery of
              purchased goods by flood, fire, wars, acts of God or any cause
              that is beyond our control.
            </p>
          </section>

          {/* Return, Exchanges & Cancellations */}
          <section>
            <div className="flex items-center mb-4">
              <RefreshCw className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Return, Exchanges & Cancellations
              </h2>
            </div>
            <p className="text-black leading-relaxed mb-4">
              GEARMATES does not offer any return or exchange facility. After
              having placed their order, customers may cancel their order by
              giving proper reasons for cancellation, only if the order has not
              been dispatched yet. We do not accept any cancellation on orders
              after the product has been dispatched from our warehouse. In case
              of cancellation, there is no credit refund given on the purchase
              amount, but you may exchange it for another GEARMATES product(s)
              available on our website of same or higher value by paying the
              remainder.
            </p>
            <p className="text-black leading-relaxed mb-4">
              Any product that has been missing, hampered or damaged while
              transportation MUST be notified by email within 24 hours of the
              product being delivered along with the unboxing video mandatorily
              and returned to our warehouse within a strict time period of one
              week, else GEARMATES will not be liable to accept the product. In
              such cases, the customer will have to write to{" "}
              <a
                href="mailto:gearmates.info@gmail.com"
                className="text-red-600 hover:underline"
              >
                gearmates.info@gmail.com
              </a>{" "}
              and a prompt response is guaranteed from our end. We will
              investigate the damage from our end. We will try to repair or
              replace the product. However, GEARMATES reserves the right to
              determine authenticity of damage and to decide whether we may be
              able to repair or replace the product. All couriers of this nature
              will be borne by the customer themselves. GEARMATES will only bear
              the expenses of the transaction after the repair of the product.
            </p>
          </section>

          {/* Important Notice */}
          <section>
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Important Notice
                  </h3>
                  <p className="text-black leading-relaxed">
                    Always make unboxing video while opening the packet as it is
                    compulsory to share unboxing video while raising claim for
                    wrong/empty/damaged product within 24 hours of delivery.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <section>
            <div className="flex items-center mb-4">
              <Package className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-2xl font-semibold text-black">
                Quick Reference
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  Delivery Timeline
                </h3>
                <p className="text-black text-sm">4 - 6 days after dispatch</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">Shipping Cost</h3>
                <p className="text-black text-sm">
                  Free for all prepaid orders
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  Cancellation Window
                </h3>
                <p className="text-black text-sm">Before dispatch only</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-black mb-3">
                  Damage Claim Period
                </h3>
                <p className="text-black text-sm">
                  Within 24 hours of delivery
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gray-900 text-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-4">
              For any shipping-related queries or concerns, please contact us:
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

export default ShippingPolicy;

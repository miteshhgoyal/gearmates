import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Headphones,
  Shield,
  Truck,
} from "lucide-react";

const Contact = () => {
  const GOOGLE_MAPS_EMBED_URL =
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3500.1827636747953!2d77.34253199999999!3d28.684179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQxJzAzLjAiTiA3N8KwMjAnMzMuMSJF!5e0!3m2!1sen!2sin!4v1758295705826!5m2!1sen!2sin";

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      info: "+91 92051 63669, +91 70538 09341",
      description: "Call us for immediate assistance",
      availability: "Mon-Sat, 9 AM - 8 PM IST",
    },
    {
      icon: Mail,
      title: "Email Support",
      info: "gearmates.info@gmail.com",
      description: "Send us your queries anytime",
      availability: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Chat",
      info: "+91 92051 63669, +91 70538 09341",
      description: "Quick chat support available",
      availability: "Mon-Sat, 9 AM - 8 PM IST",
    },
  ];

  const services = [
    {
      icon: Headphones,
      title: "Technical Support",
      description:
        "Get help with product setup, compatibility, and troubleshooting",
    },
    {
      icon: Shield,
      title: "Warranty & Returns",
      description: "Assistance with warranty claims and return processes",
    },
    {
      icon: Truck,
      title: "Order Support",
      description: "Track orders, shipping updates, and delivery inquiries",
    },
  ];

  const businessHours = [
    { day: "Monday - Saturday", hours: "9:00 AM - 8:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-red-50 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Title
            text1="GET IN"
            text2="TOUCH"
            subtitle="We're here to help with all your tech accessory needs"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods & Store Info */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Store Image & Info */}
          <div className="relative">
            <img
              className="w-full rounded-2xl shadow-2xl"
              src={assets.contact_img}
              alt="GearMates Tech Store"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <div>
                  <p className="font-bold">Visit Our Store</p>
                  <p className="text-sm text-red-100">
                    C-91, Shalimar Garden, Sahibabad, Ghaziabad, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Have questions about our products or need technical support? Our
                expert team is ready to assist you with all your tech accessory
                needs.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors"
                  >
                    <div className="bg-red-100 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {method.title}
                      </h4>
                      <p className="text-red-600 font-medium mb-1">
                        {method.info}
                      </p>
                      <p className="text-gray-600 text-sm mb-1">
                        {method.description}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {method.availability}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Store Address */}
            <div className="bg-gradient-to-r from-gray-100 to-red-100 p-6 rounded-xl">
              <div className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-red-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Our Location
                  </h4>
                  <p className="text-gray-700 mb-2">
                    GearMates Tech Store
                    <br />
                    C-91, Shalimar Garden, Sahibabad
                    <br />
                    Ghaziabad, Uttar Pradesh
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Currently Open</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Find Us on Map
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our physical store for hands-on experience with our tech
              accessories. We're conveniently located in Shalimar Garden,
              Sahibabad.
            </p>
          </div>

          {/* Responsive Google Maps Container */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100">
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }} // 16:9 aspect ratio
            >
              <iframe
                title="GearMates Store Location"
                src={GOOGLE_MAPS_EMBED_URL}
                className="absolute top-0 left-0 w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Quick Directions */}
          <div className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Need Directions?
                </h4>
                <p className="text-gray-600">
                  Click on the map to get turn-by-turn directions to our store
                </p>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <MapPin className="h-5 w-5 text-red-600" />
                <span>C-91, Shalimar Garden, Sahibabad</span>
              </div>
            </div>
          </div>
        </div>

        {/* Services We Provide */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How We Can Help You
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated support team specializes in tech accessories and is
              ready to assist you with expert guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:border-red-200"
                >
                  <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <IconComponent className="h-8 w-8 text-red-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-900 text-white rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
              <p className="text-gray-300 mb-6">
                Visit our store or contact us during these hours for the best
                support experience.
              </p>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-300">{schedule.day}</span>
                    <span className="text-red-400 font-medium">
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6">
                <Clock className="h-12 w-12 text-white mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Need Urgent Help?</h4>
                <p className="text-red-100 mb-4">
                  For immediate assistance outside business hours, send us a
                  WhatsApp message.
                </p>
                <p className="text-white font-medium">
                  +91 92051 63669, +91 70538 09341
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

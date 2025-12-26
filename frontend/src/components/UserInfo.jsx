const InfoItem = ({ icon, label, value }) => (
  <div className="flex hover:shadow-xl items-center p-3 bg-gradient-to-br to-green-900 hover:bg-gray-800 rounded-lg transition-colors space-x-4">
    <div className="text-green-800 ml-4 border-2 border-green-300 bg-green-600 p-2 rounded-full">
      {icon}
    </div>
    <div className="flex-1 text-right">
      <p className="text-xs text-gray-400 uppercase font-semibold">{label}</p>
      <p className=" font-medium">{value}</p>
    </div>
  </div>
)

export default InfoItem
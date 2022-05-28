const { default: DashboardLayout } = require("@components/DashboardLayout");
const { default: Header } = require("@components/Header");
import BackButton from '@components/BackButton';

function NewScraperProperties() {

  return <DashboardLayout heading={`New Properties > Scraping Sessions > {id} > Properties`}>
    <div style={{ display: 'flex', alignItems: 'center', }}>
      <BackButton />

    </div>
  </DashboardLayout>;
}

export default NewScraperProperties;
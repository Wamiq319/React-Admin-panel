// FILE FOR IMPORTING ALL THE COMPONENTS AT ONE PLACE
// SO THEY CAN BE USED AND IMPORTED FROM ONE FILE

// General Components
import DataTable from "../components/DataTable";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import { Button, InputField } from "../components/FormComponents";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Modal from "../components/Modal";
import Notification from "../components/Notification";
import PageHeader from "../components/PageHeader";
import PageNav from "../components/PageNav";
import Spinner from "../components/Spinner";
import Card from "../components/StatusCards";
import DashboardCard from "./DashboardCard";
import SearchInput from "../components/Search";

// Chart Components
import DataBarChart from "./charts/DataBarChart";
import DataLineChart from "./charts/DataLineChart";
import DataPieChart from "./charts/DataPieChart";
import DataRadarChart from "./charts/DataRadarChart";

// Exporting all components from a single file
export {
  DataTable,
  SideBar,
  Header,
  Button,
  InputField,
  LanguageSwitcher,
  Modal,
  Notification,
  PageHeader,
  PageNav,
  Spinner,
  Card,
  DashboardCard,
  SearchInput,
  DataBarChart,
  DataLineChart,
  DataPieChart,
  DataRadarChart,
};

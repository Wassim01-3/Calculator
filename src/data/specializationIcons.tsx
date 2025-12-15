import {
  TrendingUp,
  Monitor,
  BarChart3,
  FileText,
  Brain,
  Globe,
  Briefcase,
  DollarSign,
  Megaphone,
  Users,
  Settings,
  Building2,
} from 'lucide-react';

export const getSpecializationIcon = (id: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    lse: <TrendingUp className="w-full h-full" />,
    lbc: <Monitor className="w-full h-full" />,
    lbi: <Brain className="w-full h-full" />,
    lsg: <BarChart3 className="w-full h-full" />,
    lsc: <FileText className="w-full h-full" />,
    leb: <Globe className="w-full h-full" />,
    com: <Briefcase className="w-full h-full" />,
    lfin: <DollarSign className="w-full h-full" />,
    lmk: <Megaphone className="w-full h-full" />,
    lma: <Users className="w-full h-full" />,
    ing: <Settings className="w-full h-full" />,
    mon: <Building2 className="w-full h-full" />,
  };

  return iconMap[id] || <BarChart3 className="w-full h-full" />;
};


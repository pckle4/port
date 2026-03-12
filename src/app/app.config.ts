import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import {
  Activity, AlertCircle, AlertTriangle, ArrowDown, ArrowLeft, ArrowRight,
  ArrowUp, ArrowUpRight, BookOpen, Braces, Brain, Briefcase, Calendar,
  Check, CheckCircle, CheckCircle2, ChevronRight, Code, Code2, Coffee, Copy, Cpu, Database,
  Download, ExternalLink, Eye, EyeOff, FileJson, FileText, Folder,
  Github, Globe, GraduationCap, Heart, Home, Info, Layers, Layout, Lightbulb,
  Linkedin, Loader2, Lock, Mail, MapPin, Menu, MessageCircle, Monitor,
  Moon, Palette, RefreshCw, Rocket, Search, Send, Server, Shield, ShieldCheck, Smartphone, Sparkles,
  Sun, Terminal, Trophy, User, Wifi, Wrench, X, Zap, Star, Tag, MessageSquare
} from 'lucide-angular';

const usedIcons = {
  Activity, AlertCircle, AlertTriangle, ArrowDown, ArrowLeft, ArrowRight,
  ArrowUp, ArrowUpRight, BookOpen, Braces, Brain, Briefcase, Calendar,
  Check, CheckCircle, CheckCircle2, ChevronRight, Code, Code2, Coffee, Copy, Cpu, Database,
  Download, ExternalLink, Eye, EyeOff, FileJson, FileText, Folder,
  Github, Globe, GraduationCap, Heart, Home, Info, Layers, Layout, Lightbulb,
  Linkedin, Loader2, Lock, Mail, MapPin, Menu, MessageCircle, MessageSquare, Monitor,
  Moon, Palette, RefreshCw, Rocket, Search, Send, Server, Shield, ShieldCheck, Smartphone, Sparkles,
  Sun, Terminal, Trophy, User, Wifi, Wrench, X, Zap, Star, Tag
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })),
    provideClientHydration(withEventReplay()),
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(usedIcons) }
  ]
};

// Sidebar.tsx
import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { navigate } from '../navigations/rootNavigate';

interface SidebarProps {
  activeItem: string;
  title: string;
  onSelect: (item: string) => void;
  onClose: () => void; 
  username: string;
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem,
  onSelect,
  title,
  username,
  role,
  onClose,
}) => {
  return (
    <View style={styles.sidebar}>
      {/* Botón cerrar */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={onClose}>
          <Feather name="x" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.role}>{role}</Text>
      </View>

      <View style={styles.menu}>
        <SidebarItem
          icon="home"
          label="Roles"
          active={activeItem === 'Roles'}
          onPress={() => {
            onSelect('Rol');
            navigate('Rol'); 
          }}
        />

        <SidebarItem 
          icon="file-text"
          label="Formularios"
          active={activeItem === 'Formularios'}
          onPress={() => {
            onSelect('Form');
            navigate('Form'); 
          }}
        />
        <SidebarItem 
          icon="grid"
          label="Modulos"
          active={activeItem === 'Modulos'}
          onPress={() => {
            onSelect('Module');
            navigate('Module'); 
          }}
        />
        <SidebarItem 
          icon="user"
          label="Personas"
          active={activeItem === 'Personas'}
          onPress={() => {
            onSelect('Person');
            navigate('Person'); 
          }}
        />
      </View>

      <TouchableOpacity style={styles.logout}>
        <Feather name="log-out" size={18} color="#555" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

interface SidebarItemProps {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onPress }) => (
  <TouchableOpacity
    style={[styles.menuItem, active && styles.menuItemActive]}
    onPress={onPress}
  >
    <Feather name={icon} size={18} color={active ? '#fff' : '#333'} />
    <Text style={[styles.menuText, active && styles.menuTextActive]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E2A3A',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#ccc',
    borderRadius: 30,
    marginBottom: 8,
  },
  username: {
    fontWeight: '600',
    color: '#333',
  },
  role: {
    fontSize: 12,
    color: '#888',
  },
  menu: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderRadius: 25,
  },
  menuItemActive: {
    backgroundColor: '#007BFF',
  },
  menuText: {
    fontSize: 14,
    color: '#333',
  },
  menuTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 20,
  },
  logoutText: {
    color: '#555',
    fontSize: 14,
  },
});

export default Sidebar;

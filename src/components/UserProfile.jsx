// src/components/UserProfile.jsx
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Mail, Award, Edit2, Camera, X, Check, Loader2, Shield, Globe, AlertTriangle, Trash2, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { getShaThemeColors } from '../theme/sha';

const UserProfile = ({ user, onLogout, onUserUpdate, theme = 'dark' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isSuperAdminProfile = location?.pathname === "/superadmin/profile";
  const isSupervisorProfile = location?.pathname === "/supervisor/profile";
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    username: user?.username || ''
  });
  
  // Account Deletion State
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  
  // Image Upload State
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.profilePic || null);
  const fileInputRef = useRef(null);

  // Change Password State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showUpdatePasswordConfirm, setShowUpdatePasswordConfirm] = useState(false);
  const [showPasswordValues, setShowPasswordValues] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  const toProfileColors = (mode) => {
    const c = getShaThemeColors(mode);
    return {
      bg: c.bg,
      card: c.card,
      cardBorder: c.cardBorder,
      text: c.text,
      textSecondary: c.textSecondary,
      primary: c.primary,
      gradientStart: c.gradientStart,
      gradientEnd: c.gradientEnd,
      inputBg: c.inputBg,
      inputBorder: c.inputBorder,
      danger: c.danger,
      success: c.success,
    };
  };
  const colors = { dark: toProfileColors('dark'), light: toProfileColors('light') };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-500" style={{ background: currentColors.bg }}>
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" style={{ color: currentColors.primary }} />
          <p className="font-medium tracking-wide" style={{ color: currentColors.textSecondary }}>Loading Profile...</p>
        </div>
      </div>
    );
  }

  const handleImageClick = () => {
    if (isEditing) fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
  };

  const performChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword) {
      setPasswordChangeError('All fields are required.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordChangeError('New passwords do not match.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordChangeError('New password must be at least 6 characters long.');
      return;
    }

    setIsChangingPassword(true);
    try {
      // 1. Verify current password
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwordForm.currentPassword,
      });

      if (authError) {
        throw new Error('Incorrect current password. Please try again.');
      }

      // 2. Update to new password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      });

      if (updateError) {
        throw updateError;
      }

      setPasswordChangeSuccess('Password successfully updated!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (err) {
      console.error('Error changing password:', err);
      setPasswordChangeError(err.message || 'Failed to change password.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Submit handler: show confirmation first, then actually perform change on confirm.
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordChangeError('');
    setPasswordChangeSuccess('');
    setShowUpdatePasswordConfirm(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      let newProfilePicUrl = user.profilePic;
      
      // 1. Upload Avatar if changed
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user.id || 'user'}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, avatarFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath);

        newProfilePicUrl = publicUrl;
      }

      // 2. Save Data to Supabase Auth Metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          username: formData.username,
          profilePic: newProfilePicUrl
        }
      });

      if (updateError) throw updateError;

      // 2b. Keep `public.profiles` in sync for Super Admin views
      try {
        const { error: profileUpdateError } = await supabase
          .from("profiles")
          .update({
            full_name: formData.name,
            username: formData.username,
            avatar_url: newProfilePicUrl,
          })
          .eq("id", user.id);
        if (profileUpdateError) console.warn("profiles update warning:", profileUpdateError);
      } catch (e) {
        console.warn("profiles update warning:", e);
      }

      // 3. Update Local State
      const updatedUser = {
        ...user,
        name: formData.name,
        username: formData.username,
        profilePic: newProfilePicUrl
      };

      if (onUserUpdate) {
        onUserUpdate(updatedUser);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEdit = () => {
    setFormData({ 
      name: user.name || '', 
      username: user.username || ''
    });
    setAvatarPreview(user.profilePic || null);
    setAvatarFile(null);
    setIsEditing(false);
    setError('');
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setShowPasswordPrompt(false);
    setDeletePassword('');
    setDeleteError('');
    setIsDeleting(false);
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setDeleteError('Password is required');
      return;
    }
    
    setIsDeleting(true);
    setDeleteError('');
    
    try {
      // 1. Verify password by attempting to sign in
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: deletePassword,
      });

      if (authError) {
        throw new Error('Incorrect password. Please try again.');
      }

      // 2. Call backend function to delete the user. 
      // Supabase client can't directly delete users, it requires admin privileges.
      // The secure method is to have a PostgreSQL function (RPC) or Edge Function
      const { error: rpcError } = await supabase.rpc('delete_user');
      
      if (rpcError) {
        // If RPC doesn't exist or fails, log it and try the auth api if enabled (unlikely)
        console.warn('RPC delete_user failed/not found, attempting fallback...', rpcError);
        throw new Error('Failed to delete account on the server. Please contact support or make sure the delete_user RPC is set up.');
      }

      // 3. Log out and clean up
      await supabase.auth.signOut();
      if (onLogout) {
        onLogout();
      }
    } catch (err) {
      setDeleteError(err.message || 'Failed to delete account');
      setIsDeleting(false);
    }
  };

  const getRoleDisplay = () => {
    switch(user.role) {
      case 'admin': return 'Administrator';
      case 'supervisor': return 'Supervisor';
      default: return 'Training Member';
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 pt-10 md:pt-10" style={{ background: currentColors.bg }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4">
              <span
                className="bg-gradient-to-l bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    theme === 'dark'
                      ? `linear-gradient(to right, ${currentColors.gradientStart}, ${currentColors.gradientEnd})`
                      : `linear-gradient(to left, ${currentColors.gradientEnd}, ${currentColors.gradientStart})`,
                  textShadow:
                    theme === 'dark'
                      ? '0 0 30px rgba(0, 229, 255, 0.4)'
                      : '0 0 20px rgba(124, 77, 255, 0.3)',
                }}
              >
                Profile Settings
              </span>
            </h1>
            <p className="mt-1 text-sm" style={{ color: currentColors.textSecondary }}>
              Manage your account settings and preferences
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isSuperAdminProfile || isSupervisorProfile ? (
              <button
                type="button"
                onClick={() => navigate(isSupervisorProfile ? "/supervisor" : "/superadmin")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105 shadow-sm"
                style={{
                  background: `${currentColors.primary}12`,
                  color: currentColors.text,
                  border: `1px solid ${currentColors.cardBorder}`,
                }}
              >
                <ArrowLeft className="w-4 h-4" style={{ color: currentColors.primary }} />
                <span>Back</span>
              </button>
            ) : null}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all hover:scale-105 shadow-sm"
              style={{
                background: `${currentColors.danger}15`,
                color: currentColors.danger,
                border: `1px solid ${currentColors.danger}30`
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div 
              className="rounded-3xl p-8 transition-all duration-300 sticky top-24"
              style={{
                background: currentColors.card,
                border: `1px solid ${currentColors.cardBorder}`,
                boxShadow: theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)'
              }}
            >
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group mb-4">
                  <div
                    onClick={handleImageClick}
                    className={`w-56 h-56 rounded-full overflow-hidden flex items-center justify-center text-white text-4xl font-black transition-all duration-300 ${isEditing ? 'cursor-pointer hover:ring-4 hover:ring-offset-2 hover:ring-offset-transparent' : ''}`}
                    style={{
                      background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})`,
                      boxShadow: `0 8px 24px ${currentColors.primary}40`,
                      '--tw-ring-color': currentColors.primary
                    }}
                  >
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      user.name?.charAt(0)?.toUpperCase() || user.username?.charAt(0)?.toUpperCase() || 'U'
                    )}
                    
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-0 flex flex-col items-center justify-center opacity-100 transition-all duration-300 rounded-full">
                        <Camera className="w-8 h-8 text-white mb-1" />
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Change</span>
                      </div>
                    )}
                  </div>
                  
                  
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                
              </div>

              <hr className="space-y-3 pt-0 border-t" style={{ borderColor: currentColors.cardBorder }}></hr>
              {/* Quick Stats */}
                {/* {user.joinedDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: currentColors.textSecondary }}>
                      Training Member Since
                    </span>
                    <span className="text-sm font-bold" style={{ color: currentColors.text }}>
                      {user.joinedDate}
                    </span>
                  </div>
                )} */}

              {/* Buttons replace each other exactly in the same spot */}
              {isEditing ? (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={cancelEdit} 
                    disabled={isLoading}
                    className="flex-1 py-3 rounded-xl font-bold transition-all hover:bg-opacity-80 disabled:opacity-50"
                    style={{ 
                      background: currentColors.inputBg, 
                      color: currentColors.text, 
                      border: `1px solid ${currentColors.inputBorder}` 
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave} 
                    disabled={isLoading}
                    className="flex-[2] py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] shadow-xl disabled:opacity-70 disabled:hover:scale-100 flex justify-center items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})` }}
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full mt-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})` }}
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-2 space-y-5">
            
            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-2xl flex items-center gap-3 animate-pulse" style={{ background: `${currentColors.danger}15`, border: `1px solid ${currentColors.danger}30`, color: currentColors.danger }}>
                <X className="w-5 h-5 flex-shrink-0" />
                <p className="font-medium text-sm">{error}</p>
              </div>
            )}

            {/* Profile Tab Content */}
            <div 
              className="rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: currentColors.card,
                border: `1px solid ${currentColors.cardBorder}`,
                boxShadow: theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)'
              }}
            >
              <div className="space-y-6 mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: currentColors.text }}>
                    Personal Information
                  </h3>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                    {isEditing ? "Modify your account details below" : "Your account details and information"}
                  </p>
                </div>
                <hr className="space-y-3 pt-5 border-t" style={{ borderColor: currentColors.cardBorder }}></hr>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  
                  {/* Name Field (Editable In-Place) */}
                  <div 
                    className={`p-5 rounded-xl transition-all ${isEditing ? 'ring-1' : 'hover:-translate-y-1'}`}
                    style={{ 
                      background: currentColors.inputBg, 
                      border: `1px solid ${currentColors.inputBorder}`,
                      '--tw-ring-color': currentColors.primary
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-lg"
                        style={{ background: `${currentColors.primary}15`, color: currentColors.primary }}
                      >
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: currentColors.textSecondary }}>
                          Full Name
                        </p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-transparent focus:outline-none font-semibold truncate py-0.5 border-b-2"
                            style={{ color: currentColors.text, borderColor: currentColors.primary }}
                            placeholder="Enter full name"
                            autoFocus
                          />
                        ) : (
                          <p className="font-semibold truncate py-0.5 border-b-2 border-transparent" style={{ color: currentColors.text }}>
                            {user.name || 'Not set'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Username Field (Editable In-Place) */}
                  <div 
                    className={`p-5 rounded-xl transition-all ${isEditing ? 'ring-1' : 'hover:-translate-y-1'}`}
                    style={{ 
                      background: currentColors.inputBg, 
                      border: `1px solid ${currentColors.inputBorder}`,
                      '--tw-ring-color': currentColors.primary
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-lg"
                        style={{ background: `${currentColors.primary}15`, color: currentColors.primary }}
                      >
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: currentColors.textSecondary }}>
                          Username
                        </p>
                        {isEditing ? (
                          <div className="flex items-center border-b-2" style={{ borderColor: currentColors.primary }}>
                            <span className="font-semibold mr-0.5" style={{ color: currentColors.textSecondary }}>@</span>
                            <input
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              className="w-full bg-transparent focus:outline-none font-semibold truncate py-0.5"
                              style={{ color: currentColors.text }}
                              placeholder="username"
                            />
                          </div>
                        ) : (
                          <p className="font-semibold truncate py-0.5 border-b-2 border-transparent" style={{ color: currentColors.text }}>
                            @{user.username}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email Field (Static) */}
                  <div 
                    className="p-5 rounded-xl transition-all hover:-translate-y-1"
                    style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.inputBorder}` }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-lg"
                        style={{ background: `${currentColors.primary}15`, color: currentColors.primary }}
                      >
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: currentColors.textSecondary }}>
                          Email Address
                        </p>
                        <p className="font-semibold truncate py-0.5 border-b-2 border-transparent" style={{ color: currentColors.text }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Role Field (Static) */}
                  <div 
                    className="p-5 rounded-xl transition-all hover:-translate-y-1"
                    style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.inputBorder}` }}
                  >
                    <div className="flex items-start gap-3">
                      <div 
                        className="p-2.5 rounded-lg"
                        style={{ background: `${currentColors.primary}15`, color: currentColors.primary }}
                      >
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: currentColors.textSecondary }}>
                          Account Type
                        </p>
                        <p className="font-semibold truncate py-0.5 border-b-2 border-transparent" style={{ color: currentColors.text }}>
                          {getRoleDisplay()}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Change Password Section */}
              <div 
                className="rounded-2xl p-6 md:p-8 transition-all duration-300"
                style={{
                  background: currentColors.card,
                  border: `1px solid ${currentColors.cardBorder}`,
                  boxShadow: theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)'
                }}
              >
                <div className="space-y-6 mb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: currentColors.text }}>
                        <Shield className="w-5 h-5" />
                        Security Settings
                      </h3>
                      <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                        Update your password to keep your account secure.
                      </p>
                    </div>
                    {!showPasswordForm && (
                      <button
                        onClick={() => {
                          setShowPasswordForm(true);
                          setShowUpdatePasswordConfirm(false);
                          setPasswordChangeError('');
                          setPasswordChangeSuccess('');
                          setShowPasswordValues({ current: false, new: false, confirm: false });
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105"
                        style={{
                          background: `${currentColors.primary}15`,
                          color: currentColors.primary,
                          border: `1px solid ${currentColors.primary}30`
                        }}
                      >
                        Change Password
                      </button>
                    )}
                  </div>
                </div>

                {showPasswordForm && (
              <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 z-0"
                  style={{ background: theme === 'dark' ? 'rgba(0,0,0,0.65)' : 'rgba(15,23,42,0.45)' }}
                  onClick={() => {
                    setShowUpdatePasswordConfirm(false);
                    setShowPasswordForm(false);
                    setPasswordChangeError('');
                    setPasswordChangeSuccess('');
                        setShowPasswordValues({ current: false, new: false, confirm: false });
                  }}
                />

                <div
                  className="relative w-full max-w-lg rounded-2xl p-6 md:p-8 animate-fade-in z-[101]"
                  style={{
                    background: currentColors.card,
                    border: `1px solid ${currentColors.cardBorder}`,
                    boxShadow: theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.4)' : '0 10px 40px rgba(0,0,0,0.12)',
                  }}
                  role="dialog"
                  aria-modal="true"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: currentColors.text }}>
                        <Shield className="w-5 h-5" />
                        Update Password
                      </h3>
                      <p className="text-sm mt-1" style={{ color: currentColors.textSecondary }}>
                        Confirm your details before updating.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUpdatePasswordConfirm(false);
                        setShowPasswordForm(false);
                        setPasswordChangeError('');
                        setPasswordChangeSuccess('');
                        setShowPasswordValues({ current: false, new: false, confirm: false });
                      }}
                      disabled={isChangingPassword}
                      className="p-2 rounded-xl transition-all hover:scale-105 disabled:opacity-50"
                      style={{
                        background: currentColors.inputBg,
                        color: currentColors.textSecondary,
                        border: `1px solid ${currentColors.inputBorder}`,
                      }}
                      aria-label="Close password modal"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="relative">
                      {showUpdatePasswordConfirm && (
                        <div
                          className="absolute inset-0 z-10 flex items-center justify-center p-4 rounded-2xl"
                        >
                          <div
                            className="p-5 rounded-xl animate-fade-in flex flex-col items-start gap-4"
                            style={{ background: currentColors.bg, border: `1px solid ${currentColors.primary}50` }}
                          >
                            <p className="font-semibold text-sm" style={{ color: currentColors.text }}>
                              Are you sure you want to update your password?
                            </p>
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={() => setShowUpdatePasswordConfirm(false)}
                                className="px-4 py-2 rounded-lg text-sm transition-all font-medium"
                                style={{ background: currentColors.inputBg, color: currentColors.textSecondary. hov }}
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                onClick={async () => {
                                  setShowUpdatePasswordConfirm(false);
                                  await performChangePassword();
                                }}
                                disabled={isChangingPassword}
                                className="px-4 py-2 rounded-lg text-sm text-white font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
                                style={{ background: currentColors.primary }}
                              >
                                Yes, update password
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className={showUpdatePasswordConfirm ? 'pointer-events-none opacity-70' : ''}>
                        {passwordChangeError && (
                          <div className="p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: `${currentColors.danger}15`, color: currentColors.danger }}>
                            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                            {passwordChangeError}
                          </div>
                        )}

                        {passwordChangeSuccess && (
                          <div className="p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: `${currentColors.success}15`, color: currentColors.success }}>
                            <Check className="w-4 h-4 flex-shrink-0" />
                            {passwordChangeSuccess}
                          </div>
                        )}

                    <div className="space-y-3">
                          <label className="mt-5 text-xs font-bold uppercase tracking-wider block" style={{ color: currentColors.textSecondary }}>
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswordValues.current ? 'text' : 'password'}
                              name="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={handlePasswordInputChange}
                              className="w-full p-3 pr-12 rounded-xl bg-transparent focus:outline-none transition-all"
                              style={{ 
                                color: currentColors.text, 
                                border: `1px solid ${currentColors.inputBorder}`,
                                background: currentColors.inputBg,
                                '--tw-ring-color': currentColors.primary,
                                boxShadow: `0 0 0 1px ${currentColors.inputBorder}30`
                              }}
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswordValues((s) => ({ ...s, current: !s.current }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:scale-[1.05]"
                              style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.inputBorder}` }}
                              aria-label={showPasswordValues.current ? 'Hide current password' : 'Show current password'}
                            >
                              {showPasswordValues.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                      <div className="space-y-3">
                          <label className="mt-5 text-xs font-bold uppercase tracking-wider block" style={{ color: currentColors.textSecondary }}>
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswordValues.new ? 'text' : 'password'}
                              name="newPassword"
                              value={passwordForm.newPassword}
                              onChange={handlePasswordInputChange}
                              className="w-full p-3 pr-12 rounded-xl bg-transparent focus:outline-none transition-all"
                              style={{ 
                                color: currentColors.text, 
                                border: `1px solid ${currentColors.inputBorder}`,
                                background: currentColors.inputBg,
                                '--tw-ring-color': currentColors.primary,
                                boxShadow: `0 0 0 1px ${currentColors.inputBorder}30`
                              }}
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswordValues((s) => ({ ...s, new: !s.new }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:scale-[1.05]"
                              style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.inputBorder}` }}
                              aria-label={showPasswordValues.new ? 'Hide new password' : 'Show new password'}
                            >
                              {showPasswordValues.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                      <div className="space-y-3">
                          <label className="mt-5 text-xs font-bold uppercase tracking-wider block" style={{ color: currentColors.textSecondary }}>
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswordValues.confirm ? 'text' : 'password'}
                              name="confirmNewPassword"
                              value={passwordForm.confirmNewPassword}
                              onChange={handlePasswordInputChange}
                            className="w-full p-3 pr-12 rounded-xl bg-transparent focus:outline-none transition-all"
                              style={{ 
                                color: currentColors.text, 
                                border: `1px solid ${currentColors.inputBorder}`,
                                background: currentColors.inputBg,
                                '--tw-ring-color': currentColors.primary,
                                boxShadow: `0 0 0 1px ${currentColors.inputBorder}30`
                              }}
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswordValues((s) => ({ ...s, confirm: !s.confirm }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all hover:scale-[1.05]"
                              style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.inputBorder}` }}
                              aria-label={showPasswordValues.confirm ? 'Hide confirm password' : 'Show confirm password'}
                            >
                              {showPasswordValues.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 flex gap-3">
                          <button
                            type="button"
                            onClick={() => {
                              setShowUpdatePasswordConfirm(false);
                              setShowPasswordForm(false);
                              setPasswordChangeError('');
                              setPasswordChangeSuccess('');
                              setShowPasswordValues({ current: false, new: false, confirm: false });
                            }}
                            disabled={isChangingPassword || showUpdatePasswordConfirm}
                            className="px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 hover:scale-[1.02]"
                            style={{ 
                              background: currentColors.inputBg, 
                              color: currentColors.text, 
                              border: `1px solid ${currentColors.inputBorder}` 
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isChangingPassword || showUpdatePasswordConfirm || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmNewPassword}
                            className="flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.02]"
                            style={{ background: `linear-gradient(135deg, ${currentColors.gradientStart}, ${currentColors.gradientEnd})` }}
                          >
                            {isChangingPassword ? <Loader2 className="w-5 h-5 animate-spin" /> : <Shield className="w-4 h-4" />}
                            {isChangingPassword ? 'Updating Password...' : 'Update Password'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
              </div>

            {/* Danger Zone */}
            <div 
              className="rounded-2xl p-6 md:p-8 transition-all duration-300"
              style={{
                background: currentColors.card,
                border: `1px solid ${currentColors.cardBorder}`,
                boxShadow: theme === 'dark' ? '0 10px 40px rgba(0,0,0,0.3)' : '0 10px 40px rgba(0,0,0,0.05)'
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: currentColors.danger }}>
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </h3>
                  <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                    Permanently remove your account and all associated data.
                  </p>
                </div>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-opacity-80"
                  style={{ background: `${currentColors.danger}15`, color: currentColors.danger, border: `1px solid ${currentColors.danger}30` }}
                >
                  Delete Account
                </button>
              </div>

              {/* Confirm Deletion Prompt */}
              {showDeleteConfirm && !showPasswordPrompt && (
                <div className="mt-6 p-5 rounded-xl animate-fade-in flex flex-col items-start gap-4" style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.danger}50` }}>
                  <p className="font-semibold text-sm" style={{ color: currentColors.text }}>
                    Are you completely sure you want to delete your account? This action is irreversible.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={cancelDelete}
                      className="px-4 py-2 rounded-lg text-sm transition-all font-medium hover:scale-[1.05]"
                      style={{ background: currentColors.inputBg, color: currentColors.text }}
                    >
                      No, cancel
                    </button>
                    <button
                      onClick={() => setShowPasswordPrompt(true)}
                      className="px-4 py-2 rounded-lg text-sm text-white font-semibold flex items-center gap-2"
                      style={{ background: currentColors.danger }}
                    >
                      <Trash2 className="w-4 h-4" />
                      Yes, I am sure
                    </button>
                  </div>
                </div>
              )}

              {/* Password Prompt */}
              {showPasswordPrompt && (
                <div className="mt-6 p-5 rounded-xl animate-fade-in" style={{ background: currentColors.inputBg, border: `1px solid ${currentColors.danger}50` }}>
                  <p className="font-semibold text-sm mb-3" style={{ color: currentColors.text }}>
                    Please enter your password to confirm deletion:
                  </p>
                  
                  {deleteError && (
                    <div className="mb-3 p-3 rounded-lg flex items-center gap-2 text-sm" style={{ background: `${currentColors.danger}15`, color: currentColors.danger }}>
                      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                      {deleteError}
                    </div>
                  )}

                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full p-3 rounded-lg bg-transparent focus:outline-none mb-4"
                    style={{ 
                      color: currentColors.text, 
                      border: `1px solid ${currentColors.inputBorder}`,
                      '--tw-ring-color': currentColors.danger,
                      outline: 'none',
                      boxShadow: `0 0 0 1px ${currentColors.danger}30`
                    }}
                    autoFocus
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={cancelDelete}
                      disabled={isDeleting}
                      className="px-4 py-2 rounded-lg text-sm transition-all font-medium disabled:opacity-50"
                      style={{ background: currentColors.inputBg, color: currentColors.textSecondary }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={isDeleting || !deletePassword}
                      className="px-4 py-2 rounded-lg text-sm text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                      style={{ background: currentColors.danger }}
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
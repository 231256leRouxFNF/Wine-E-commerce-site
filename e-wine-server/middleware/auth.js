function setUser(req, res, next) {
  req.user = { role: req.header('x-user-role') || 'user' };
  next();
}

function requireRole(role) {
  return (req, res, next) => {
    const userRole = req.user?.role || 'user';
    const allowed = Array.isArray(role) ? role.includes(userRole) : userRole === role;
    if (!allowed) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}

module.exports = { setUser, requireRole };

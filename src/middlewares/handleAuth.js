export const handleAuth = (...roles) => { // roles => ['admin','superadmin']
    return (req, res, next) => {
        if(!req.user) return res.status(401).json({error: 'No hay user'})
        if(!roles.includes(req.user.rol)) return res.status(403).json({error:'No autorizado'})
        
        next();
    }
}
